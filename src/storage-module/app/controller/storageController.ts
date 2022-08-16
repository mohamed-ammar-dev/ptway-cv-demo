import { Response, Request } from "express";
import { sendResponse } from "../../../shared/utils/sendResponse";
import { SIGNED_URL_ACTION } from "../../enums/signedUrlAction";
import { BUCKET } from "../../../config/constants";
import { SignedUrlService } from "../../service/signedUrlsService";

export class StorageController {
  async getSignedUrl(request: Request, response: Response) {
    const storageModule = request.body.module;
    const filesName = request.body.filesName;
    const referenceId = request.body.referenceId;
    const action = request.body.action;
    const signedUrlsService = new SignedUrlService();
    let urls: any = [];

    for (let i = 0; i < storageModule.length; i++) {
      const module = storageModule[i];

      if (action == SIGNED_URL_ACTION.DOWNLOAD)
        urls.push(
          await signedUrlsService.download({
            bucket: BUCKET,
            filesName,
            module,
            referenceId,
          })
        );
      else if (action == SIGNED_URL_ACTION.UPLOAD)
        urls.push(
          await signedUrlsService.upload({
            bucket: BUCKET,
            filesName,
            module,
            referenceId,
          })
        );
    }
    sendResponse(response, urls);
  }
}
