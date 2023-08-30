import { createSignInController } from '@/modules/user/usecases/sign-in'
import { createSignUpController } from '@/modules/user/usecases/sign-up'
import { Request, Response, Router } from 'express'

export const userRoutes = Router()

userRoutes.post('/sign-up', async (req: Request, res: Response) => {
  await createSignUpController.handle(req, res)
})

userRoutes.post('/sign-in', async (req: Request, res: Response) => {
  await createSignInController.handle(req, res)
})
