import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

import sendResponse from './app/utils/sendResponse';
import router from './app/routes';

const app: Application = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    message: 'Server is successfully running 🏃‍♀️‍➡️🏃‍♀️‍➡️🏃‍♀️‍➡️',
    statusCode: 200,
    data: null,
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
