import { PrismaUserRepository } from '@/modules/user/repositories/prisma/prisma-user-repository'
import { FindTotalMealsInsideDietController } from './find-total-meals-inside-diet.controller'
import { PrismaMetricRepository } from '../../repositories/prisma/prisma-metric.repository'

const userRepository = new PrismaUserRepository()
const metricRepository = new PrismaMetricRepository()

export const createFindTotalMealsInsideDietController =
  new FindTotalMealsInsideDietController(metricRepository, userRepository)
