import { Request, Response } from "express";
import { diContainer } from "../../../config/inversify.config";
import { DI_TYPES } from "../../../shared/types/di";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { ICvCoreService } from "../../interfaces/ICvCoreService";

export class CvController {
  async getAllTemplates(request: Request, response: Response) {
    const cvCoreService = diContainer.get<ICvCoreService>(
      DI_TYPES.CvCoreService
    );
    const urls = await cvCoreService.getAllTemplates(request.body);

    sendResponse(response, urls);
  }

  async getMyTemplate(request: Request, response: Response) {
    const cvCoreService = diContainer.get<ICvCoreService>(
      DI_TYPES.CvCoreService
    );
    const url = await cvCoreService.getMyTemplate(request.body);

    sendResponse(response, url);
  }

  async saveMyCvTemplateInfo(request: Request, response: Response) {
    const cvCoreService = diContainer.get<ICvCoreService>(
      DI_TYPES.CvCoreService
    );
    await cvCoreService.saveMyCvTemplateInfo(request.body);

    sendResponse(response);
  }

  async saveMyCvTemplate(request: Request, response: Response) {
    const cvCoreService = diContainer.get<ICvCoreService>(
      DI_TYPES.CvCoreService
    );
    const savedCv = await cvCoreService.saveMyCvTemplate(request.body);

    sendResponse(response, savedCv);
  }
}
