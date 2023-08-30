import { createRegisterMealController } from '@/modules/meal/usecases/register-meal'
import { Request, Response, Router } from 'express'
import { ensureAuthenticate } from '@/infra/shared/http/middleware/ensure-authenticate.middleware'

export const mealRoutes = Router()

mealRoutes.post(
  '/meals',
  ensureAuthenticate,
  async (req: Request, res: Response) => {
    await createRegisterMealController.handle(req, res)
  },
)
