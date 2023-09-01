import { createRegisterMealController } from '@/modules/meal/usecases/register-meal'
import { Request, Response, Router } from 'express'
import { ensureAuthenticate } from '@/infra/shared/http/middleware/ensure-authenticate.middleware'
import { createUpdateMealController } from '@/modules/meal/usecases/update-meal'
import { createDeleteMealController } from '@/modules/meal/usecases/delete-meal'

export const mealRoutes = Router()

mealRoutes.post(
  '/meals',
  ensureAuthenticate,
  async (req: Request, res: Response) => {
    await createRegisterMealController.handle(req, res)
  },
)

mealRoutes.post(
  '/meals/:id',
  ensureAuthenticate,
  async (req: Request, res: Response) => {
    await createUpdateMealController.handle(req, res)
  },
)

mealRoutes.delete(
  '/meals/:id',
  ensureAuthenticate,
  async (req: Request, res: Response) => {
    await createDeleteMealController.handle(req, res)
  },
)
