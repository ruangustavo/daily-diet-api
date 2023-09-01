import { UserRepository } from '@/modules/user/repositories/user-repository'
import { MealRepository } from '../../repositories/meal.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

interface RegisterMealRequest {
  name: string
  description?: string
  isCheatMeal: boolean
}

export class RegisterMealUsecase {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    { name, description, isCheatMeal }: RegisterMealRequest,
    userId: string,
  ) {
    const existingUser = await this.userRepository.findById(userId)

    if (!existingUser) {
      throw new ResourceNotFoundError('User not found')
    }

    const mealCreated = this.mealRepository.register({
      name,
      description,
      isCheatMeal,
      user: {
        connect: {
          id: userId,
        },
      },
    })

    return mealCreated
  }
}
