import { Schema, model } from 'mongoose'
import { BlogModelStatic, TBlog } from './blog.interface'

export const BlogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    blogImage: {
      type: String,
      required: false
    },
    blogTags: {
      type: [String],
      required: true
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false, timestamps: true }
)

BlogSchema.statics.isBlogExist = async function (id: string) {
  const blog = await BlogModel.findById(id)
  return blog
}

// create model for blog schema
export const BlogModel = model<TBlog, BlogModelStatic>('blog', BlogSchema)