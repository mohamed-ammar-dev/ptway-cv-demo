import { AppError } from "../../../error-module/baseError/appError";
import { STATUS_CODE } from "../../../error-module/types/statusCode";

class CvHelper {
  validateExistTemplate(template: any) {
    if (!template)
      throw new AppError("there is no template", STATUS_CODE.VALIDATION_ERROR);
  }

  validateExistCvUserInfo(cvUserInfo: any) {
    if (!cvUserInfo)
      throw new AppError(
        "please complete your data, then try again",
        STATUS_CODE.VALIDATION_ERROR
      );
  }
}

export default new CvHelper();
