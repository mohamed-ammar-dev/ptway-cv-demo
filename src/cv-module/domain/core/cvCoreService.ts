import { inject, injectable } from "inversify";
import { ICvTemplateRepo } from "../ports/ICvTemplateRepo";
import cvHelper from "./cvHelper";
import "reflect-metadata";
import { DI_TYPES } from "../../../shared/types/di";
import { ICvCoreService } from "../../interfaces/ICvCoreService";
import { paginationType } from "../../../shared/types/paginationType";
import { ISignedUrlService } from "../../../storage-module/interfaces/ISignedUrlService";
import { BUCKET } from "../../../config/constants";
import { STORAGE_MODULE } from "../../../storage-module/enums/storageModule";
import networkingRest from "../../../3rd-party-module/networkingRest";
import { promises } from "fs";
import puppeteer from "puppeteer";
import { ICvUserInfoRepo } from "../ports/ICvUserInfoRepo";
import { ICvUserSavedRepo } from "../ports/ICvUserSavedRepo";

@injectable()
export class CvCoreService implements ICvCoreService {
  constructor(
    @inject(DI_TYPES.CvTemplateRepo) private cvTemplateRepo: ICvTemplateRepo,
    @inject(DI_TYPES.CvUserInfoRepo) private cvUserInfoRepo: ICvUserInfoRepo,
    @inject(DI_TYPES.CvUserSavedRepo)
    private cvUserSavedRepo: ICvUserSavedRepo,
    @inject(DI_TYPES.SignedUrlService)
    private signedUrlService: ISignedUrlService
  ) {}

  async getAllTemplates(params: paginationType) {
    const templates = await this.cvTemplateRepo.findWithPagination(params);

    const urls = [];

    for (let i = 0; i < templates.length; i++) {
      const template = templates[i];

      urls.push(
        await this.signedUrlService.download({
          bucket: BUCKET,
          module: STORAGE_MODULE.CV_TEMPLATES,
          referenceId: template.id,
          filesName: [template.fileName],
        })
      );
    }

    return urls;
  }

  async getMyTemplate(params: { userId: number; cvTemplateId: number }) {
    //User ID FROM THE TOKEN
    const userId = params.userId;
    const cvTemplateId = params.cvTemplateId;

    const template = await this.cvUserSavedRepo.findOne({
      condition: { userId, cvTemplateId },
      attributes: ["fileName"],
    });

    cvHelper.validateExistTemplate(template);

    const file = await this.signedUrlService.download({
      bucket: BUCKET,
      module: STORAGE_MODULE.CV_TEMPLATES,
      referenceId: `${userId}`,
      filesName: [template.fileName],
    });

    return file[0].url;
  }

  async saveMyCvTemplateInfo(params: any) {
    await this.cvUserInfoRepo.create(params);
  }

  async saveMyCvTemplate(params: { userId: number; cvTemplateId: number }) {
    //User ID FROM THE TOKEN
    const userId = params.userId;
    const cvTemplateId = params.cvTemplateId;

    const template = await this.cvTemplateRepo.findOne({
      condition: { id: cvTemplateId },
    });

    cvHelper.validateExistTemplate(template);

    const cvUserInfo = await this.cvUserInfoRepo.findOne({
      condition: { userId },
    });

    cvHelper.validateExistCvUserInfo(cvUserInfo);

    //GET PRESIGNED URL LINK
    const s3File = await this.signedUrlService.download({
      bucket: BUCKET,
      module: STORAGE_MODULE.CV_TEMPLATES,
      referenceId: template.id,
      filesName: [template.fileName],
    });

    //DOWNLOAD THE FILE ON THE SERVER
    const { fullPath, fileName, path } = await networkingRest.download({
      url: s3File[0].url,
      extension: "html",
    });

    const { pdfFullPath } = await this.convertHtmlToPdf({
      cvUserInfo,
      fileName,
      path,
      htmlFullPath: fullPath,
    });

    await this.uploadPdf({ pdfFullPath, userId, fileName });

    return await this.cvUserSavedRepo.create({
      cvTemplateId,
      userId,
      fileName,
    });
  }

  private async convertHtmlToPdf(params: {
    path: string;
    htmlFullPath: string;
    fileName: string;
    cvUserInfo: any;
  }) {
    const filePath = params.path;
    const fullPath = params.htmlFullPath;
    const cvUserInfo = params.cvUserInfo;
    const fileName = params.fileName;

    const htmlTemplate = await promises.readFile(fullPath, {
      encoding: "utf-8",
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(htmlTemplate);

    await page.evaluate(
      ({ cvUserInfo }) => {
        const objective: HTMLDivElement = document.querySelector("#objective")!;
        const experienceCompanyName: HTMLDivElement = document.querySelector(
          "#experienceCompanyName"
        )!;

        objective.innerText = cvUserInfo.objective;
        experienceCompanyName.innerText = cvUserInfo.experience.companyName;
      },
      {
        cvUserInfo,
      }
    );

    await page.waitForNetworkIdle();

    const pdfFullPath = `${filePath}/${fileName}.pdf`;

    await page.pdf({
      path: pdfFullPath,
      format: "a4",
    });

    await browser.close();

    return { pdfFullPath };
  }

  private async uploadPdf(params: {
    pdfFullPath: string;
    userId: number;
    fileName: string;
  }) {
    const pdfFullPath = params.pdfFullPath;
    const userId = params.userId;
    const fileName = params.fileName;

    const data = Buffer.from(await promises.readFile(pdfFullPath));

    await this.signedUrlService.put({
      key: `${STORAGE_MODULE.CV_TEMPLATES}/${userId}/${fileName}.pdf`,
      data,
      bucket: BUCKET,
      contentType: "application/pdf",
    });
  }
}
