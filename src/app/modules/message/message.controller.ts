import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import status from 'http-status';
import { messageServices } from './message.service';

const createMessage = catchAsync(async (req, res) => {
  const result = await messageServices.saveMessageIntoDB(req.body)
  sendResponse(res, {
    success: true,
    message: 'Message send successfully',
    data: result,
    statusCode: status.CREATED
  })
})

const getAllMessage = catchAsync(async (req, res) => {
  const result = await messageServices.getAllMessageFromDB()
  sendResponse(res, {
    success: true,
    message: "Message retrived successfull",
    data: result,
    statusCode: status.OK
  })
})
const mark_as_red = catchAsync(async (req, res) => {
  const result = await messageServices.mark_as_red_into_db(req?.params?.id)
  sendResponse(res, {
    success: true,
    message: "Message reded successful.",
    data: result,
    statusCode: status.OK
  })
})

export const messageControllers = {
  createMessage,
  getAllMessage,
  mark_as_red
}