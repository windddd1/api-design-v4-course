import { protect } from './../middlewares/auth.middleware';
import express from 'express'
import authRoute from './auth.route'
import userRoute from './user.route'
import postRoute from './post.route'


const router = express.Router()

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/post',
    route: postRoute,
  },
]

const noAuthRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
]


defaultRoutes.forEach((route) => {
  router.use(route.path, protect, route.route);
})

noAuthRoutes.forEach((route) => {
  router.use(route.path, route.route);
})

export default router