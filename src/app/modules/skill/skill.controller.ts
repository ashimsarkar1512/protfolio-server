import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { skill_services } from "./skill.service";


const create_skill = catchAsync(async (req, res) => {
    const result = await skill_services.save_skill_into_db(req.body)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Skill created ",
        data: result
    })
})
const update_skill = catchAsync(async (req, res) => {
    const { id } = req?.params
    const result = await skill_services.update_skill_into_db(id, req.body)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Skill updated ",
        data: result
    })
})
const delete_skill = catchAsync(async (req, res) => {
    const { id } = req?.params
    await skill_services.delete_skill_into_db(id)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Skill deleted! ",
        data: null, 
    })
})
const get_all_skill = catchAsync(async (req, res) => {
    const result = await skill_services.get_all_skill_from_db()
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Skill fetched successful.",
        data: result
    })
})
const get_one_skill = catchAsync(async (req, res) => {
    const { id } = req?.params
    const result = await skill_services.get_one_skill_from_db(id)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Skill fetched successful.",
        data: result
    })
})




export const skill_controller = {
    create_skill,
    update_skill,
    delete_skill,
    get_all_skill,
    get_one_skill
}