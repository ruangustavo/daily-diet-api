import { PrismaUserRepository } from '@/modules/user/repositories/prisma/prisma-user-repository'
import { FindTotalMealsRecordedController } from './find-total-meals-recorded.controller'
import { PrismaMetricRepository } from '../../repositories/prisma/prisma-metric.repository'

const userRepository = new PrismaUserRepository()
const metricRepository = new PrismaMetricRepository()

export const createFindTotalMealsRecordedController =
  new FindTotalMealsRecordedController(metricRepository, userRepository)
