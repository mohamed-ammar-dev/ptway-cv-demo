import Joi from "joi";
import { SIGNED_URL_ACTION } from "../../enums/signedUrlAction";
import { STORAGE_MODULE } from "../../enums/storageModule";

export const signedUrlSchema = Joi.object().keys({
  module: Joi.array()
    .items(
      Joi.string().valid(STORAGE_MODULE.CV_TEMPLATES, STORAGE_MODULE.USER_CV)
    )
    .required(),
  referenceId: Joi.string().required(),
  filesName: Joi.array()
    .items(
      Joi.string()
        .required()
        .pattern(/^.*\.(jpe?g|pdf|png)$/i)
    )
    .max(10),
  action: Joi.string()
    .valid(SIGNED_URL_ACTION.DOWNLOAD, SIGNED_URL_ACTION.UPLOAD)
    .required(),
});
