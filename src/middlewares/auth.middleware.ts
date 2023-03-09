import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
  const cookie = req.cookies.sid
  const headerCSRFToken = req.get("X-CSRF-Token");
  if (!cookie && !headerCSRFToken) {
    res.status(401)
    res.json({message: 'Not authorized'})
    return
  }

  try {
    const user = jwt.verify(cookie, process.env.JWT_SECRET)
    if(user.csrfToken !== headerCSRFToken) {
      res.status(401)
      res.json({message: 'Not authorized'})
      return
    }
    req.user = user
    next()
  } catch (e) {
    return res.status(401).json({"error": true, "message": 'Unauthorized access.', detail: e });
  }
}

