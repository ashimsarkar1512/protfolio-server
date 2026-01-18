import authRoute from '../modules/auth/auth.route'
import blogRouter from '../modules/blog/blog.route'
import messageRoute from '../modules/message/message.route'

import projectRoute from '../modules/project/project.route'
import { Router } from 'express'
import skill_router from '../modules/skill/skill.route'


const serverRoutes = Router()

type TServerRoutes = {
  path: string
  route: any
}
const allRoutes: TServerRoutes[] = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/blogs',
    route: blogRouter
  },
  {
    path: '/project',
    route: projectRoute
  },
  {
    path: "/message",
    route: messageRoute
  },
  {
    path: "/skill",
    route: skill_router
  }
]

// dynamically create route
allRoutes.forEach(route => serverRoutes.use(route.path, route.route))

export default serverRoutes