import { PrismaUserRepository } from '@/modules/user/repositories/prisma/prisma-user-repository'
import { PrismaMealRepository } from '../../repositories/prisma/prisma-meal-repository'
import { FindMealsByUserController } from './find-meals-by-user.controller'

const userRepository = new PrismaUserRepository()
const mealRepository = new PrismaMealRepository()

export const createFindMealsByUserController = new FindMealsByUserController(
  mealRepository,
  userRepository,
)
