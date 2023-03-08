import {Router} from 'express'
import { signIn } from '../controllers/user'
import { createNewUser } from '../controllers/user'
// import { validateBody, validateParam } from '../middlewares/validate.middleware'
// import { schemas } from '../validation/index'
const router = Router()

router.post('/signin', signIn)
router.post('/signup', createNewUser)

export default router