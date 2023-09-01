import { Request, Response } from 'express'
import { MealRepository } from '../../repositories/meal.repository'
import { z } from 'zod'
import { FindMealByIdUsecase } from './find-meal-by-id.usecase'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

const findMealByIdPathParamsSchema = z.object({
  id: z.string().uuid(),
})

export class FindMealByIdController {
  constructor(private mealRepository: MealRepository) {}

  async handle(req: Request, res: Response) {
    const { userId } = req

    const parsedPathParams = findMealByIdPathParamsSchema.safeParse(req.params)

    if (!parsedPathParams.success) {
      return res.status(422).json({
        message: 'Validation error',
        errors: parsedPathParams.error.issues,
      })
    }

    const { id: mealId } = parsedPathParams.data

    const findMealByIdUsecase = new FindMealByIdUsecase(this.mealRepository)

    try {
      const meal = await findMealByIdUsecase.execute({
        mealId,
        userId,
      })
      return res.status(200).json({ meal })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message })
      }
    }
  }
}
