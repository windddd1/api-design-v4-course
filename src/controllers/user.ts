import prisma from '../config/db'
import jwt from 'jsonwebtoken'
import { comparePasswords, hashPassword, setTokenCookie } from '../utils/authUtils'

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
  
    setTokenCookie(res, user)
    res.json({ success: true })
  } catch(e) {
    console.log(e)
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

  setTokenCookie(res, user)
  res.json({ success: true })
}

export const signInLocal = async (req, res) => {
  const user = {
    id: '123123123123124123',
    username: 'PhongTest'
  }

  setTokenCookie(res, user)
  res.json({ success: true })
}

export const refreshingToken = (req,res) => {
  const csrfToken = req.get("X-CSRF-Token")
  const refreshToken = req.get("Refresh-Token")

  if (!csrfToken && !refreshToken) {
    return res.status(401).json({message: 'Not authorized'})
  }

  const user = jwt.verify(refreshToken, process.env.JWT_SECRET)
  if(user.csrfToken !== csrfToken) {
    return res.status(401).json({message: 'Not authorized'})
  }

  setTokenCookie(res, user)
  res.json({ success: true })
}

export const logout = (req,res) => {
  res.clearCookie('sid')
  res.set("X-CSRF-Token", '')
  return res.json({success: true})
}