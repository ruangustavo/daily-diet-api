import { PrismaUserRepository } from '@/modules/user/repositories/prisma/prisma-user-repository'
import { PrismaMealRepository } from '../../repositories/prisma/prisma-meal-repository'
import { UpdateMealController } from './update-meal.controller'

const userRepository = new PrismaUserRepository()
const mealRepository = new PrismaMealRepository()

export const createUpdateMealController = new UpdateMealController(
  mealRepository,
  userRepository,
)
