import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5)
}

export const setTokenCookie = (res, user) => {
  const csrfToken = uuidv4()
  const token = jwt.sign({
      id: user.id,
      username: user.username,
      csrfToken
    }, 
    process.env.JWT_SECRET,
    { expiresIn: 20}
  )
  const refreshToken = jwt.sign({
    id: user.id,
    username: user.username,
    csrfToken
  }, 
  process.env.REFRESH_JWT_SECRET,
  { expiresIn: '90d' }
)
  res.cookie('sid', token, {
    httpOnly: true,
    secure: true, //for what
  })
  res.set("X-CSRF-Token", csrfToken)
  res.set("Refresh-Token", refreshToken)
}
