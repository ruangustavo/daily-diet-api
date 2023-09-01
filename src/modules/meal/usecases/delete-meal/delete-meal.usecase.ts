import { UserRepository } from '@/modules/user/repositories/user-repository'
import { MealRepository } from '../../repositories/meal.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

interface DeleteMealUsecaseRequest {
  mealId: string
  userId: string
}

export class DeleteMealUsecase {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ mealId, userId }: DeleteMealUsecaseRequest) {
    const existingUser = await this.userRepository.findById(userId)
    if (!existingUser) {
      throw new ResourceNotFoundError('User not found')
    }

    const existingMeal = await this.mealRepository.findById(mealId)
    if (!existingMeal) {
      throw new ResourceNotFoundError('Meal not found')
    }

    if (existingMeal.userId !== userId) {
      throw new ResourceNotFoundError('Meal not found')
    }

    const result = await this.mealRepository.delete(mealId)
    return result
  }
}
