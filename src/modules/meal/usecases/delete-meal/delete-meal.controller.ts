import { Request, Response } from 'express'
import { MealRepository } from '../../repositories/meal.repository'
import { UserRepository } from '@/modules/user/repositories/user-repository'
import { DeleteMealUsecase } from './delete-meal.usecase'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { z } from 'zod'

const deleteMealPathParamsSchema = z.object({
  id: z.string().uuid(),
})

export class DeleteMealController {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const parsedPathParams = deleteMealPathParamsSchema.safeParse(req.params)

    if (!parsedPathParams.success) {
      return res.status(422).json({
        message: 'Validation error',
        errors: parsedPathParams.error.issues,
      })
    }

    const { id: mealId } = parsedPathParams.data

    const deleteMealUsecase = new DeleteMealUsecase(
      this.mealRepository,
      this.userRepository,
    )

    try {
      await deleteMealUsecase.execute({ mealId, userId: req.userId })
      return res.status(200).json({ message: 'Meal deleted successfully' })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message })
      }
    }
  }
}
