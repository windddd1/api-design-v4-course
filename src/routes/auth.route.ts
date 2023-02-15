import {Router} from 'express'
import { getListPost, getDetailPost, createPost, updatePost, deletePost } from '../controllers/post'
import { signin } from '../controllers/user'
import { validateBody, validateParam } from '../middlewares/validate.middleware'
import { schemas } from '../validation/index'
const router = Router()

router.post('/signin', signin)

export default router