import {Router} from 'express'
import { createNewUser } from '../controllers/user'
import { validateBody, validateParam } from '../middlewares/validate.middleware'
import { schemas } from '../validation/index'
const router = Router()

router.post('/user', createNewUser)

export default router