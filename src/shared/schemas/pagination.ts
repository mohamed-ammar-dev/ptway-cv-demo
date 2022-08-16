import Joi from "joi";

export const paginationSchema = Joi.object({
  limit: Joi.number(),
  page: Joi.number(),
});
