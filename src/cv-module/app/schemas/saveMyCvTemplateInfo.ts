import Joi from "joi";

export const saveMyCvTemplateInfoSchema = Joi.object({
  userId: Joi.number().required(),
  objective: Joi.string().required(),
  experience: Joi.object({
    companyName: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});
