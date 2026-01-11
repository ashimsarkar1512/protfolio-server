import { model, Schema } from 'mongoose'
import { TProject } from './project.interface'

const projectSchema = new Schema<TProject>(
  {
    projectImage: {
      type: String,
      required: false
    },
    projectName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    slogan: {
      type: String,
      required: true
    },
    technologies: {
      type: [String],
      required: true
    },
    features: {
      type: [String],
      required: true
    },
    frontEndGitRepo: {
      type: String,
      required: true
    },
    backEndGitRepo: {
      type: String,
      required: true
    },
    liveLink: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isFeatured: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

export const ProjectModel = model<TProject>('project', projectSchema)