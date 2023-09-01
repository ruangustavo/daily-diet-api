import { Request, Response } from 'express'
import { UserRepository } from '@/modules/user/repositories/user-repository'
import { FindBestSequenceDietUsecase } from './find-best-sequence-diet.usecase'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { MealRepository } from '@/modules/meal/repositories/meal.repository'

export class FindBestSequenceDietController {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { userId } = req

    const bestSequenceDietUsecase = new FindBestSequenceDietUsecase(
      this.mealRepository,
      this.userRepository,
    )

    try {
      const bestSequenceDiet = await bestSequenceDietUsecase.execute({
        userId,
      })
      return res.status(200).json({ best_sequence_diet: bestSequenceDiet })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message })
      }
    }
  }
}
