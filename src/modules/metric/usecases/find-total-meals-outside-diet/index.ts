import { PrismaUserRepository } from '@/modules/user/repositories/prisma/prisma-user-repository'
import { PrismaMetricRepository } from '../../repositories/prisma/prisma-metric.repository'
import { FindTotalMealsOutsideDietController } from './find-total-meals-outside-diet.controller'

const userRepository = new PrismaUserRepository()
const metricRepository = new PrismaMetricRepository()

export const createFindTotalMealsOutsideDietController =
  new FindTotalMealsOutsideDietController(metricRepository, userRepository)
