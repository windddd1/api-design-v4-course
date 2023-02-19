import {Router} from 'express'
import { createNewUser, getAllUser } from '../controllers/user'
import { validateBody, validateParam } from '../middlewares/validate.middleware'
import { schemas } from '../validation/index'
const router = Router()

router.post('/', createNewUser)
router.get('/', getAllUser)

export default router