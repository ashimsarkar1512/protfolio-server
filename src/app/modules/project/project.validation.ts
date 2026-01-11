import { z } from 'zod'

const createProjectValidation = z.object({
  projectName: z.string().min(1, { message: 'Project name is required' }),
  description: z
    .string(),
  slogan: z.string().min(1, { message: 'Slogun is required' }),
  technologies: z
    .array(z.string().min(1))
    .min(1, { message: 'At least one technology is required' }),
  features: z
    .array(z.string().min(1))
    .min(1, { message: 'At least one feature is required' }),
  frontEndGitRepo: z.string(),
  backEndGitRepo: z.string(),
  liveLink: z.string(),
  isDeleted: z.boolean().optional()
})

const updateProjectValidation = z.object({
  projectName: z
    .string()
    .min(1, { message: 'Project name is required' })
    .optional(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .optional(),
  slogan: z.string().min(1, { message: 'Slogun is required' }).optional(),
  technologies: z
    .array(z.string().min(1))
    .min(1, { message: 'At least one technology is required' })
    .optional(),
  features: z
    .array(z.string().min(1))
    .min(1, { message: 'At least one feature is required' })
    .optional(),
  frontEndGitRepo: z.string().optional(),
  backEndGitRepo: z.string().optional(),
  liveLink: z.string().optional(),
  isDeleted: z.boolean().optional()
})

export const projectValidations = {
  createProjectValidation, updateProjectValidation

}