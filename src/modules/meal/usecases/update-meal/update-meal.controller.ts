import { Request, Response } from 'express'
import { MealRepository } from '../../repositories/meal.repository'
import { UserRepository } from '@/modules/user/repositories/user-repository'
import { z } from 'zod'
import { UpdateMealUsecase } from './update-meal.usecase'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

const updateMealSchema = z.object({
  name: z.string().nonempty().optional(),
  description: z.string().optional(),
  is_cheat_meal: z.boolean().optional(),
})

const updateMealPathParamsSchema = z.object({
  id: z.string().uuid(),
})

export class UpdateMealController {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const parsedPathParams = updateMealPathParamsSchema.safeParse(req.params)

    if (!parsedPathParams.success) {
      return res.status(422).json({
        message: 'Validation error',
        errors: parsedPathParams.error.issues,
      })
    }

    const { id: mealId } = parsedPathParams.data

    const parsedData = updateMealSchema.safeParse(req.body)

    if (!parsedData.success) {
      return res
        .status(422)
        .json({ message: 'Validation error', errors: parsedData.error.issues })
    }

    const { name, description, is_cheat_meal: isCheatMeal } = parsedData.data

    const updateMealUsecase = new UpdateMealUsecase(
      this.mealRepository,
      this.userRepository,
    )

    try {
      const meal = await updateMealUsecase.execute(
        { name, description, isCheatMeal },
        mealId,
        req.userId,
      )
      return res.status(200).json({ meal })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message })
      }
    }
  }
}
