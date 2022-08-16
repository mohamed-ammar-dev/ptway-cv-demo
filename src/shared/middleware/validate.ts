import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ArraySchema } from "joi";

export const validate = (schema: ObjectSchema | ArraySchema) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    await schema.validateAsync(request.body);

    next();
  };
};
