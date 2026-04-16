import express, { Request, Response } from "express";
import cors from "cors";
import status from "http-status";
import cookieParser from "cookie-parser";

import sendResponse from "./app/utils/sendResponse";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import serverRoutes from "./app/router/routes";
import { server_config } from "./app/config/server.config";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
const allowedOrigins = server_config.cors_origins
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins?.length ? allowedOrigins : true,
    credentials: true,
  })
);

app.use("/", serverRoutes);

app.get("/", (_req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    message: "Server is successfully running",
    statusCode: status.OK,
    data: null,
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
