import { signUpController } from '@/modules/user/usecases/sign-up'
import { Request, Response, Router } from 'express'

export const userRoutes = Router()

userRoutes.post('/sign-up', async (req: Request, res: Response) => {
  await signUpController.handle(req, res)
})
