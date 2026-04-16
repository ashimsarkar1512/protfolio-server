import { TMessage } from "./message.interface";
import { MessageModel } from "./message.schema";

const saveMessageIntoDB = async (payload: TMessage) => {
      const result = await MessageModel.create(payload)
      return result;
}

const getAllMessageFromDB = async () => {
      const result = await MessageModel.find().sort({ createdAt: -1 })
      return result
}
const mark_as_red_into_db = async (id: string) => {
      const result = await MessageModel.findByIdAndUpdate(
            id,
            { isRead: true, isReded: true },
            { new: true }
      )
      return result
}

export const messageServices = {
      saveMessageIntoDB,
      getAllMessageFromDB,
      mark_as_red_into_db
}