import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof Error) {
    return res.status(500).json({ message: 'Unexpected error' })
  }
}
