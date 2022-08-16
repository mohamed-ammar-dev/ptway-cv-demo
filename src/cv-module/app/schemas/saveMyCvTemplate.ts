import Joi from "joi";

export const saveMyCvTemplateSchema = Joi.object({
  userId: Joi.number().required(),
  cvTemplateId: Joi.number().required(),
});
