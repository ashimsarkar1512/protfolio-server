import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import status from 'http-status'
import { TProject } from './project.interface'
import { projectServices } from './project.service'
import {
  getOptionalUploadedFilePath,
  getRequiredParam
} from '../../utils/requestValue'




const createProject = catchAsync(async (req, res) => {
  const projectInfo: TProject = req?.body
  const projectImage = getOptionalUploadedFilePath(req)
  const result = await projectServices.saveProjectOnDB({
    ...projectInfo,
    projectImage
  })
  sendResponse(res, {
    success: true,
    message: 'Project created successfully',
    data: result,
    statusCode: status.CREATED
  })
})

const getAllProject = catchAsync(async (req, res) => {
  const result = await projectServices.getAllProjectFromDb()
  sendResponse(res, {
    success: true,
    message: 'Project retirve successfully',
    data: result,
    statusCode: status.OK
  })
})
const getSingleProject = catchAsync(async (req, res) => {
  const id = getRequiredParam(req, 'id')
  const result = await projectServices.getSingleProjectFromDB(id)
  sendResponse(res, {
    success: true,
    message: 'Project retrieved successfully',
    data: result,
    statusCode: status.OK
  })
})
const updateProject = catchAsync(async (req, res) => {
  const id = getRequiredParam(req, 'id')
  const projectImage = getOptionalUploadedFilePath(req)

  if (projectImage) {
    req.body.projectImage = projectImage
  }
  const result = await projectServices.updateProjectIntoDb(id, req.body)
  sendResponse(res, {
    success: true,
    message: 'Project updated successfully',
    data: result,
    statusCode: status.OK
  })
})

const deleteProject = catchAsync(async (req, res) => {
  const id = getRequiredParam(req, 'id')
  await projectServices.deleteProjectFromDB(id)
  sendResponse(res, {
    success: true,
    message: 'Project deleted successfully',
    statusCode: status.OK,
    data: null
  })
})
const add_featured_project = catchAsync(async (req, res) => {
  const id = getRequiredParam(req, 'id')
  const result = await projectServices.add_featured_project_into_db(id)
  sendResponse(res, {
    success: true,
    message: 'Featured project added.',
    statusCode: status.OK,
    data: result
  })
})
const get_featured_project = catchAsync(async (req, res) => {
  const result = await projectServices.get_featured_project_from_db()
  sendResponse(res, {
    success: true,
    message: 'Featured project fetched.',
    statusCode: status.OK,
    data: result
  })
})
const remove_featured_project = catchAsync(async (req, res) => {
  await projectServices.remove_featured_project_into_db()
  sendResponse(res, {
    success: true,
    message: 'Featured project removed.',
    statusCode: status.OK,
    data: null
  })
})


export const projectControllers = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
  add_featured_project,
  remove_featured_project,
  get_featured_project

}
