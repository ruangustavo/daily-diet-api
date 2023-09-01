import { UserRepository } from '@/modules/user/repositories/user-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { MealRepository } from '@/modules/meal/repositories/meal.repository'
import { Meal } from '@prisma/client'

interface FindBestSequenceDietUsecaseRequest {
  userId: string
}

export class FindBestSequenceDietUsecase {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId }: FindBestSequenceDietUsecaseRequest) {
    const existingUser = await this.userRepository.findById(userId)
    if (!existingUser) {
      throw new ResourceNotFoundError('User not found')
    }

    const mealsRecorded = await this.mealRepository.findAllByUserId(userId)
    const bestSequence = this.getBestSequenceDiet(mealsRecorded)
    return bestSequence
  }

  private getBestSequenceDiet(mealsRecorded: Meal[]): number {
    let bestSequenceDiet = 0
    let currentSequenceDiet = 0

    for (const meal of mealsRecorded) {
      if (meal.isCheatMeal) {
        currentSequenceDiet = 0
      } else {
        currentSequenceDiet++
      }

      if (currentSequenceDiet > bestSequenceDiet) {
        bestSequenceDiet = currentSequenceDiet
      }
    }

    return bestSequenceDiet
  }
}
