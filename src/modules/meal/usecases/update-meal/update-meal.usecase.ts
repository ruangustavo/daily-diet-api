import { UserRepository } from '@/modules/user/repositories/user-repository'
import { MealRepository } from '../../repositories/meal.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

interface UpdateMealRequest {
  name?: string
  description?: string
  isCheatMeal?: boolean
}

export class UpdateMealUsecase {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    { name, description, isCheatMeal }: UpdateMealRequest,
    mealId: string,
    userId: string,
  ) {
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

    const mealUpdated = await this.mealRepository.update(mealId, {
      name,
      description,
      isCheatMeal,
    })

    return mealUpdated
  }
}
