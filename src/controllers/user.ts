import prisma from '../config/db'
import { comparePasswords, createJWT, hashPassword } from '../middlewares/auth.middleware'

export const getAllUser = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    })
  
    res.json({ data: users });
  } catch(e) {
    next(e)
  }
}

export const getMyAccount = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id
      },
      include: {
        posts:{
          select : {
            
          }
        }
      }
    })
    res.json({data: user})
  } catch (e) {
    next(e)
  }
}

export const getDetailUser = async (req, res,next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.params
      },
      include: {
        posts:true
      }
    })
    res.json({data: user})
  } catch (e) {
    next(e)
  }
}

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        fullname:  req.body.fullname,
        avatar: req.body.avatar,
        birthday: req.body.birthday,
      }
    })
  
    const { token, publicKey} = createJWT(user)
    await prisma.userSession({
      data: {
        userId: user.id,
        publicKey,
        refreshToken: ''
      }
    })
    res.json({ token })
  } catch(e) {
    next(e)
  }
}

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })

  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({message: 'nope'})
    return
  }

  const token = createJWT(user)
  res.json({ token })
}

export const getUserSession = async (userId) => {
  try {
    const userSession = await prisma.userSession.findUnique({
      where: {
        userId
      }
    })
    return userSession
  }
  catch(err) {
    return err
  }
}