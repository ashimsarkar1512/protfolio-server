export type TProject = {
  projectImage?: string
  projectName: string
  description: string
  slogan: string
  technologies: string[]
  features: string[]
  frontEndGitRepo: string
  backEndGitRepo: string
  liveLink: string
  isFeatured?: boolean
  isDeleted?: boolean
}