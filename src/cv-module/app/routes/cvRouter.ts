import express from "express";
import catchAsync from "../../../error-module/utils/catchAsync";
import { CvController } from "../controllers/cvController";
import joiCatchAsync from "../../../error-module/utils/joiCatchAsync";
import { validate } from "../../../shared/middleware/validate";
import { getMyTemplateSchema } from "../schemas/getMyTemplate";
import { paginationSchema } from "../../../shared/schemas/pagination";
import { saveMyCvTemplateInfoSchema } from "../schemas/saveMyCvTemplateInfo";
import { saveMyCvTemplateSchema } from "../schemas/saveMyCvTemplate";

const cvTemplateRouter = express.Router();

cvTemplateRouter.get(
  "/getAllTemplates",
  joiCatchAsync(validate(paginationSchema)),
  catchAsync(new CvController().getAllTemplates)
);

cvTemplateRouter.get(
  "/getMyTemplate",
  joiCatchAsync(validate(getMyTemplateSchema)),
  catchAsync(new CvController().getMyTemplate)
);

cvTemplateRouter.post(
  "/saveMyCvTemplateInfo",
  joiCatchAsync(validate(saveMyCvTemplateInfoSchema)),
  catchAsync(new CvController().saveMyCvTemplateInfo)
);

cvTemplateRouter.post(
  "/saveMyCvTemplate",
  joiCatchAsync(validate(saveMyCvTemplateSchema)),
  catchAsync(new CvController().saveMyCvTemplate)
);

export default cvTemplateRouter;
