import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TBlog } from './blog.interface'
import { blogSerices } from './blog.service'
import status from 'http-status'
import {
  getOptionalUploadedFilePath,
  getRequiredParam
} from '../../utils/requestValue'

// create a new blog
const createABlog = catchAsync(async (req, res) => {
  const blogInfo: TBlog = req?.body
  const blogImage = getOptionalUploadedFilePath(req)

  const result = await blogSerices.createABlogIntoDB({
    ...blogInfo,
    blogImage
  })
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    data: result,
    statusCode: status.CREATED
  })
})

// get all blogs
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogSerices.getAllBlogsFromDB(req.query)
  sendResponse(res, {
    success: true,
    message: 'Blogs is retrieved successfully',
    data: result,
    statusCode: status.OK
  })
})

const getSingleBlog = catchAsync(async (req, res) => {
  const id = getRequiredParam(req, 'id')
  const result = await blogSerices.getSingleBlogFromDB(id)
  sendResponse(res, {
    success: true,
    message: 'Blog retrieved successfully',
    data: result,
    statusCode: status.OK
  })
})

// update blog

const updateABlog = catchAsync(async (req, res) => {
  const id = getRequiredParam(req, 'id')
  const blogImage = getOptionalUploadedFilePath(req)

  if (blogImage) {
    req.body.blogImage = blogImage
  }
  const result = await blogSerices.updateBlogIntoDB(id, req.body)
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    data: result,
    statusCode: status.OK
  })
})

//delete blog
const deleteBlog = catchAsync(async (req, res) => {
  const id = getRequiredParam(req, 'id')
  await blogSerices.deleteBlogFromDB(id)
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: status.OK,
    data: null
  })
})

export const blogController = {
  createABlog,
  getAllBlogs,
  updateABlog,
  deleteBlog,
  getSingleBlog
}
