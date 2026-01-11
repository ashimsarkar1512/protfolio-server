import z from 'zod'

const createBlogValidationSchema = z.object({
  title: z.string(),
  content: z.string(),
  blogTags: z.array(z.string())
})

const updateBlogValidationSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  blogTags: z.array(z.string()).optional()
})

export const blogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema
}