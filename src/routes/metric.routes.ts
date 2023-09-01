import { Router } from 'express'
import { createFindTotalMealsRecordedController } from '@/modules/metric/usecases/find-total-meals-recorded'
import { createFindTotalMealsInsideDietController } from '@/modules/metric/usecases/find-total-meals-inside-diet'
import { ensureAuthenticate } from '@/infra/shared/http/middleware/ensure-authenticate.middleware'

export const metricRoutes = Router()

metricRoutes.get(
  '/metrics/total-meals-recorded',
  ensureAuthenticate,
  async (req, res) => {
    await createFindTotalMealsRecordedController.handle(req, res)
  },
)

metricRoutes.get(
  '/metrics/total-meals-inside-diet',
  ensureAuthenticate,
  async (req, res) => {
    await createFindTotalMealsInsideDietController.handle(req, res)
  },
)
