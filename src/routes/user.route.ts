import {Router} from 'express'
import { createNewUser, getAllUser, getDetailUser,getMyAccount } from '../controllers/user'
import { validateBody, validateParam } from '../middlewares/validate.middleware'
import { schemas } from '../validation/index'
const router = Router()

router.get('/', getAllUser)
router.get('/myaccount', getMyAccount)
router.get('/:id',validateParam(schemas.idSchema, 'id'),getDetailUser)


export default router