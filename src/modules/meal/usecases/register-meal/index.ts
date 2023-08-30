import { PrismaUserRepository } from '@/modules/user/repositories/prisma/prisma-user-repository'
import { PrismaMealRepository } from '../../repositories/prisma/prisma-meal-repository'
import { RegisterMealController } from './register-meal.controller'

const userRepository = new PrismaUserRepository()
const mealRepository = new PrismaMealRepository()

export const createRegisterMealController = new RegisterMealController(
  mealRepository,
  userRepository,
)
