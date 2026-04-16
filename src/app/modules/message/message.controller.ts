import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import status from 'http-status';
import { messageServices } from './message.service';
import { getRequiredParam } from '../../utils/requestValue';
import AppError from '../../errors/AppError';

const createMessage = catchAsync(async (req, res) => {
  const result = await messageServices.saveMessageIntoDB(req.body)
  sendResponse(res, {
    success: true,
    message: 'Message sent successfully',
    data: result,
    statusCode: status.CREATED
  })
})

const getAllMessage = catchAsync(async (req, res) => {
  const result = await messageServices.getAllMessageFromDB()
  sendResponse(res, {
    success: true,
    message: "Messages retrieved successfully",
    data: result,
    statusCode: status.OK
  })
})
const mark_as_red = catchAsync(async (req, res) => {
  const id = getRequiredParam(req, 'id')
  const result = await messageServices.mark_as_red_into_db(id)

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Message not found")
  }

  sendResponse(res, {
    success: true,
    message: "Message status updated successfully.",
    data: result,
    statusCode: status.OK
  })
})

export const messageControllers = {
  createMessage,
  getAllMessage,
  mark_as_red
}
