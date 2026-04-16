import { model, Schema } from 'mongoose'
import { TMessage } from './message.interface'

const messageSchema = new Schema<TMessage>({
  messageBody: {
    type: String,
    required: true
  },
  messageTitle: {
    type: String,
    required: true
  },
  senderEmail: { type: String, required: true },
  senderName: { type: String, required: true },
  // keep both keys for backward compatibility with existing data
  isRead: { type: Boolean, default: false },
  isReded: { type: Boolean, default: false }
}, { timestamps: true })

export const MessageModel = model("message", messageSchema)