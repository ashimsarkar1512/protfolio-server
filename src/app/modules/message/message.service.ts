import { TMessage } from "./message.interface";
import { MessageModel } from "./message.schema";

const saveMessageIntoDB = async (payload: TMessage) => {
      const result = await MessageModel.create(payload)
      return result;
}

const getAllMessageFromDB = async () => {
      const result = await MessageModel.find()
      return result
}
const mark_as_red_into_db = async (id: string) => {
      await MessageModel.findByIdAndUpdate(id, { isReded: true })
      return "Message reded"
}

export const messageServices = {
      saveMessageIntoDB,
      getAllMessageFromDB,
      mark_as_red_into_db
}