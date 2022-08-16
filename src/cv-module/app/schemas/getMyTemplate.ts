import Joi from "joi";

export const getMyTemplateSchema = Joi.object({
  userId: Joi.number().required(),
  cvTemplateId: Joi.number().required(),
});
