import { Request, Response } from 'express'
import { MealRepository } from '../../repositories/meal.repository'
import { UserRepository } from '@/modules/user/repositories/user-repository'
import { FindMealsByUserUsecase } from './find-meals-by-user.usecase'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

export class FindMealsByUserController {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { userId } = req

    const findMealsByUserUsecase = new FindMealsByUserUsecase(
      this.mealRepository,
      this.userRepository,
    )

    try {
      const meals = await findMealsByUserUsecase.execute({ userId })
      return res.status(200).json({ meals })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message })
      }
    }
  }
}
