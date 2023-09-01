import { PrismaUserRepository } from '@/modules/user/repositories/prisma/prisma-user-repository'
import { FindBestSequenceDietController } from './find-best-sequence-diet.controller'
import { PrismaMealRepository } from '@/modules/meal/repositories/prisma/prisma-meal-repository'

const userRepository = new PrismaUserRepository()
const mealRepository = new PrismaMealRepository()

export const createFindBestSequenceDietController =
  new FindBestSequenceDietController(mealRepository, userRepository)
