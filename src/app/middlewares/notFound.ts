/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';


const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'The requested API endpoint was not found.',
    errorSources: [
      {
        path: req.originalUrl,
        message: "Route does not exist"
      }
    ],
  });
};

export default notFound;