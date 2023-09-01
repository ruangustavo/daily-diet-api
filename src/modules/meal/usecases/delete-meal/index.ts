import { PrismaUserRepository } from '@/modules/user/repositories/prisma/prisma-user-repository'
import { PrismaMealRepository } from '../../repositories/prisma/prisma-meal-repository'
import { DeleteMealController } from './delete-meal.controller'

const userRepository = new PrismaUserRepository()
const mealRepository = new PrismaMealRepository()

export const createDeleteMealController = new DeleteMealController(
  mealRepository,
  userRepository,
)
