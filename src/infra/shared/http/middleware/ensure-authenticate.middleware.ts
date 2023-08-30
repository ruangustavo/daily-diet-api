import { NextFunction, Request, Response } from 'express'
import { JwtToken } from '../../token/jwt.token'

export async function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  const verifyToken = new JwtToken().verify(token)
  if (!verifyToken) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  req.userId = verifyToken.id
  return next()
}
