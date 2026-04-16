import { Router } from "express";
import { messageControllers } from "./message.controller";
import auth from "../../utils/auth";
import authSchemaValidation from "../../utils/authSchemaValidation";
import { messageValidation } from "./message.validation";


const messageRoute = Router()

messageRoute.post(
  "/",
  authSchemaValidation(messageValidation.createMessageValidation),
  messageControllers.createMessage
)
messageRoute.get("/", auth(), messageControllers.getAllMessage)
messageRoute.patch("/:id", auth(), messageControllers.mark_as_red)


export default messageRoute