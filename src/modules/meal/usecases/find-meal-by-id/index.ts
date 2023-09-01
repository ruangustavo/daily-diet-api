import { PrismaMealRepository } from '../../repositories/prisma/prisma-meal-repository'
import { FindMealByIdController } from './find-meal-by-id.controller'

const mealRepository = new PrismaMealRepository()

export const createFindMealsByIdController = new FindMealByIdController(
  mealRepository,
)
