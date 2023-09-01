import { NextFunction, Request, Response } from 'express'
import { JwtToken } from '../../token/jwt.token'
import { TokenExpiredError } from 'jsonwebtoken'

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

  try {
    const verifyToken = new JwtToken().verify(token)
    req.userId = verifyToken.id
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired. Please, reauth' })
    }

    return res.status(401).json({ message: 'Invalid token' })
  }

  return next()
}
