import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TBlog } from './blog.interface'
import { blogSerices } from './blog.service'
import status from 'http-status'

// create a new blog
const createABlog = catchAsync(async (req, res) => {
  const blogInfo: TBlog = req?.body
  const result = await blogSerices.createABlogIntoDB({
    ...blogInfo,
    blogImage: req?.file?.path
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
  const { id } = req.params
  const result = await blogSerices.getSingleBlogFromDB(id)
  sendResponse(res, {
    success: true,
    message: 'Blogs is retrieved successfully',
    data: result,
    statusCode: status.OK
  })
})

// update blog

const updateABlog = catchAsync(async (req, res) => {
  if (req?.file?.path) {
    req.body.blogImage = req.file.path
  }
  const result = await blogSerices.updateBlogIntoDB(req.params.id, req.body)
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    data: result,
    statusCode: status.OK
  })
})

//delete blog
const deleteBlog = catchAsync(async (req, res) => {
  await blogSerices.deleteBlogFromDB(req.params.id)
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