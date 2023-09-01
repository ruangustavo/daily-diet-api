import { PrismaUserRepository } from '@/modules/user/repositories/prisma/prisma-user-repository'
import { PrismaMealRepository } from '../../repositories/prisma/prisma-meal-repository'
import { RecordMealController } from './record-meal.controller'

const userRepository = new PrismaUserRepository()
const mealRepository = new PrismaMealRepository()

export const createRecordMealController = new RecordMealController(
  mealRepository,
  userRepository,
)
