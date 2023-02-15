import express,{ Express,RequestHandler } from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app :Express = express()

app.use(cors() as RequestHandler)
app.use(morgan('dev') as RequestHandler)
app.use(express.json() as RequestHandler)
app.use(express.urlencoded({extended: true}) as RequestHandler)

// app.get('/', (req, res, next) => {
//   setTimeout(() => {
//     next(new Error('hello'))
//   },1)
// })

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
  console.log(err)
  res.json({message: `had an error: ${err.message}`})
})

export default app