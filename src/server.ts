import express,{ Express,RequestHandler } from 'express'
import routes from './routes'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './middlewares/auth.middleware'
import { createNewUser, signin } from './controllers/user'

const app :Express = express()

app.use(cors() as RequestHandler)
app.use(morgan('dev') as RequestHandler)
app.use(express.json() as RequestHandler)
app.use(express.urlencoded({extended: true}) as RequestHandler)

// // app.use('/api/user', protect, userRoute)
// app.use('/api/product', protect, productRoute)


// app.post('/user', createNewUser)
// app.post('/signin', signin)

app.use('/v1', routes);

app.use((err, req, res, next) => {
  console.log(err)
  res.json({message: `had an error: ${err.message}`})
})

export default app