import { UserRepository } from '@/modules/user/repositories/user-repository'
import { MealRepository } from '../../repositories/meal.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

interface FindMealsByUserRequest {
  userId: string
}

export class FindMealsByUserUsecase {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId }: FindMealsByUserRequest) {
    const existingUser = await this.userRepository.findById(userId)
    if (!existingUser) {
      throw new ResourceNotFoundError('User not found')
    }

    const meals = await this.mealRepository.findAllByUserId(userId)
    return meals
  }
}
