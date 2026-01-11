
import { TProject } from './project.interface'

import status from 'http-status';
import { ProjectModel } from './project.schema';
import AppError from '../../errors/AppError';

const saveProjectOnDB = async (payload: TProject) => {
  const result = await ProjectModel.create(payload)
  return result
}

const getAllProjectFromDb = async () => {
  const result = await ProjectModel.find({ isDeleted: false })

  return result
}

const getSingleProjectFromDB = async (id: string) => {
  const result = await ProjectModel.findById(id)
  return result
}
const updateProjectIntoDb = async (id: string, payload: Partial<TProject>) => {
  const result = await ProjectModel.findByIdAndUpdate(id, payload, {
    new: true
  })
  return result
}
const deleteProjectFromDB = async (id: string) => {
  await ProjectModel.findByIdAndUpdate(id, { isDeleted: true })
}
const get_featured_project_from_db = async () => {
  const result = await ProjectModel.findOne({ isFeatured: true })
  return result;
}
const add_featured_project_into_db = async (id: string) => {
  const isFeaturedExist = await ProjectModel.findOne({ isFeatured: true })
  if (isFeaturedExist) {
    throw new AppError(status.BAD_REQUEST, "Already have featured project!")
  }
  await ProjectModel.findByIdAndUpdate(id, { isFeatured: true })
  return;
}
const remove_featured_project_into_db = async () => {
  const isFeaturedExist = await ProjectModel.findOne({ isFeatured: true })
  if (!isFeaturedExist) {
    throw new AppError(status.NOT_FOUND, "Feature project not found!!")
  }
  await ProjectModel.findByIdAndUpdate(isFeaturedExist._id, { isFeatured: false })
  return;
}


export const projectServices = {
  saveProjectOnDB,
  getAllProjectFromDb,
  getSingleProjectFromDB,
  updateProjectIntoDb,
  deleteProjectFromDB,
  add_featured_project_into_db,
  get_featured_project_from_db,
  remove_featured_project_into_db

}