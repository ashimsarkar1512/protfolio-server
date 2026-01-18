// import express, { Application, Request, Response } from 'express';


// import cors from 'cors';
// import router from './app/routes';
// import notFound from './app/middlewares/notFound';
// import globalErrorHandler from './app/middlewares/globalErrorhandler';
// const app: Application = express();
// //Middleware to parse incoming JSON request
// app.use(express.json());
// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000'
//     ],
//   }),
// );

// //Application Routes
// app.use('/api/v1', router);

// //Base route
// app.get('/', (req: Request, res: Response) => {
//   res.json({
//     status: true,
//     message: 'Portfolio Server Live ⚡',
//   });
// });

// // Use the Not Found Middleware
// app.use(notFound);
// // Use the Global Error Handler
// app.use(globalErrorHandler);

// export default app;


import express, { application, Request, Response } from 'express';
import sendResponse from './app/utils/sendResponse';
import cors from "cors";
import status from 'http-status';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import serverRoutes from './app/router/routes';
const app = express()

// meddleware
app.use(express.json());
app.use(express.raw());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.use("/", serverRoutes)



// test route
app.get('/', (req: Request, res: Response) => {
    sendResponse(res, {
        success: true,
        message: "Server is successfully running 🏃‍♀️‍➡️🏃‍♀️‍➡️🏃‍♀️‍➡️",
        statusCode: status.OK,
        data: null
    })
})

// handel error globally
app.use(globalErrorHandler)
app.use(notFound)

export default app