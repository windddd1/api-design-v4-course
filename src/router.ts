import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator"
import { getListPost, getDetailPost, createPost, updatePost, deletePost } from './handlers/post'
import { validateBody, validateParam } from './helpers/routeHepler'
import { schemas } from './validation/index'
const router = Router()

/**
 * Post
 */
router.get('/product', getListPost)
router.get('/product/:id',validateParam(schemas.idSchema, 'id'), getDetailPost)
router.put('/product/:id',validateParam(schemas.idSchema, 'id'), validateBody(schemas.postSchema) , updatePost)
router.post('/product',validateBody(schemas.postSchema) , createPost)
router.delete('/product/:id',validateParam(schemas.idSchema, 'id'), deletePost)

export default router