import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { MealRepository } from '../../repositories/meal.repository'

interface FindMealByIdUsecaseRequest {
  mealId: string
  userId: string
}

export class FindMealByIdUsecase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ mealId, userId }: FindMealByIdUsecaseRequest) {
    const existingMeal = await this.mealRepository.findById(mealId)
    if (!existingMeal) {
      throw new ResourceNotFoundError('Meal not found')
    }

    if (existingMeal.userId !== userId) {
      throw new ResourceNotFoundError('Meal not found')
    }

    return existingMeal
  }
}
