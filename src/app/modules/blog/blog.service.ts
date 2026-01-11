
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TBlog } from './blog.interface'
import { BlogModel, BlogSchema } from './blog.schema'
import httpStatus from 'http-status'

// save a blog data into db
const createABlogIntoDB = async (payload: TBlog) => {
  const result = await BlogModel.create(payload)
  return result
}

// get all blogs from db
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQueries = new QueryBuilder(
    query,
    BlogModel.find({ isDeleted: { $ne: true } })
  )
    .search(['title'])
    .filter()
    .sort()
  const result = await blogQueries.queryModel
  return result
}
const getSingleBlogFromDB = async (id: string) => {
  const result = await BlogModel.findById(id)
  return result
}

// udpdate blog
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await BlogModel.findByIdAndUpdate(id, payload, { new: true })
  return result
}

// delete blog into db
const deleteBlogFromDB = async (id: string) => {
  const blogExist = await BlogModel.isBlogExist(id)
  if (!blogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog Not Found!!!')
  }
  await BlogModel.findByIdAndUpdate(id, { isDeleted: true })
}

export const blogSerices = {
  createABlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getSingleBlogFromDB
}