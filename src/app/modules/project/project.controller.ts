import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import status from 'http-status'
import { TProject } from './project.interface'
import { projectServices } from './project.service'




const createProject = catchAsync(async (req, res) => {
  const projectInfo: TProject = req?.body
  const result = await projectServices.saveProjectOnDB({
    ...projectInfo,
    projectImage: req?.file?.path
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
  const { id } = req?.params
  const result = await projectServices.getSingleProjectFromDB(id)
  sendResponse(res, {
    success: true,
    message: 'Project retirve successfully',
    data: result,
    statusCode: status.OK
  })
})
const updateProject = catchAsync(async (req, res) => {
  if (req?.file?.path) {
    req.body.projectImage = req.file.path
  }
  const result = await projectServices.updateProjectIntoDb(
    req.params.id,
    req.body
  )
  sendResponse(res, {
    success: true,
    message: 'Project updated successfully',
    data: result,
    statusCode: status.OK
  })
})

const deleteProject = catchAsync(async (req, res) => {
  await projectServices.deleteProjectFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    message: 'Project deleted successfully',
    statusCode: status.OK,
    data: null
  })
})
const add_featured_project = catchAsync(async (req, res) => {
  const { id } = req?.params
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