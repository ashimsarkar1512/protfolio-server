import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { authServices } from "./auth.service";
import status from "http-status";
// register a user
const registerNewUser = catchAsync(async (req, res) => {
    const result = await authServices.registerUserIntoDB(req.body);
    sendResponse(res, {
        success: true,
        message: "User Registered Successfully",
        statusCode: status.CREATED,
        data: result
    })
})
const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUserFromDb(req.body);
    res.cookie("accessToken", result?.token)
    sendResponse(res, {
        success: true,
        message: "User LoggedIn Successfully",
        statusCode: status.OK,
        data: result
    })
})
const get_me = catchAsync(async (req, res) => {
    const result = await authServices.get_me_from_db(req?.userInfo?.email);
    sendResponse(res, {
        success: true,
        message: "My data fetched",
        statusCode: status.OK,
        data: result
    })
})

const get_overview = catchAsync(async (req, res) => {
    const result = await authServices.get_overview_from_db();
    sendResponse(res, {
        success: true,
        message: "Overview Data fetched",
        statusCode: status.OK,
        data: result
    })
})

export const authControllers = {
    registerNewUser,
    loginUser,
    get_me,
    get_overview
}