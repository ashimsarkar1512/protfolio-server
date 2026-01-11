import { Model, Types } from 'mongoose'

export type TBlog = {
  title: string
  content: string
  blogTags: string[]
  blogImage?: string
  isPublished?: boolean
  isDeleted?: boolean
}

export interface BlogModelStatic extends Model<TBlog> {
  isBlogExist(id: string): Promise<TBlog | null>
}