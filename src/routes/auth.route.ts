import {Router} from 'express'
import { logout, signIn, signInLocal, refreshingToken, createNewUser } from '../controllers/user'

const router = Router()

router.post('/signin', signIn)
router.get('/signin-local', signInLocal)
router.post('/signup', createNewUser)
router.get('/refresh-token', refreshingToken)
router.get('/logout', logout)

export default router