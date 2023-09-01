import { Router } from 'express'
import { createFindTotalMealsRecordedMealController } from '@/modules/metric/usecases/find-total-meals-recorded'
import { ensureAuthenticate } from '@/infra/shared/http/middleware/ensure-authenticate.middleware'

export const metricRoutes = Router()

metricRoutes.get(
  '/metrics/total-meals-recorded',
  ensureAuthenticate,
  async (req, res) => {
    await createFindTotalMealsRecordedMealController.handle(req, res)
  },
)
