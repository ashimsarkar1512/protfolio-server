import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

const validateRequest = (schema: ZodObject<ZodRawShape>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
