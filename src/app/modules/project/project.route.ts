import { NextFunction, Request, Response, Router } from 'express'
import { projectControllers } from './project.controller'

import auth from '../../utils/auth'
import upload from '../../config/multer.config'
import authSchemaValidation from '../../utils/authSchemaValidation'
import { projectValidations } from './project.validation'


const projectRoute = Router()

projectRoute.post(
  '/',
  auth(),
  upload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = JSON.parse(req.body.data);
      next();
    } catch (err) {
      next(err)
    }
  },
  authSchemaValidation(projectValidations.createProjectValidation),
  projectControllers.createProject
)
projectRoute.patch("/add-featured/:id", auth(), projectControllers.add_featured_project)
projectRoute.delete("/removed-featured", auth(), projectControllers.remove_featured_project)
projectRoute.get("/get-featured", projectControllers.get_featured_project)

projectRoute.get('/', projectControllers.getAllProject)
projectRoute.get('/:id', projectControllers.getSingleProject)
projectRoute.patch(
  '/:id',
  auth(),
  upload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)

    next()
  },
  authSchemaValidation(projectValidations.updateProjectValidation),
  projectControllers.updateProject
)
projectRoute.delete('/:id', auth(), projectControllers.deleteProject)



export default projectRoute