// import { NextFunction, Request, Response } from "express";


// const authSchemaValidation = (schema: AnyZodObject) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             await schema.parseAsync(req.body);
//             next();
//         } catch (err) {
//             return next(err);
//         }

//     }
// }

// export default authSchemaValidation;



import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const authSchemaValidation = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default authSchemaValidation;
