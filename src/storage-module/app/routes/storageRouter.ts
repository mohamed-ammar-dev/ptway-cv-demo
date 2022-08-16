import express from "express";
import catchAsync from "../../../error-module/utils/catchAsync";
import joiCatchAsync from "../../../error-module/utils/joiCatchAsync";
import { validate } from "../../../shared/middleware/validate";
import { StorageController } from "../controller/storageController";
import { signedUrlSchema } from "../schemas/signedUrl";
const storageRouter = express.Router();

storageRouter.post(
  "/getSignedUrl",
  joiCatchAsync(validate(signedUrlSchema)),
  catchAsync(new StorageController().getSignedUrl)
);
export default storageRouter;
