import { Request, Response } from 'express'
import { MealRepository } from '../../repositories/meal.repository'
import { RecordMealUsecase } from './record-meal.usecase'
import { UserRepository } from '@/modules/user/repositories/user-repository'
import { z } from 'zod'

const mealSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  is_cheat_meal: z.boolean(),
})

export class RecordMealController {
  constructor(
    private mealRepository: MealRepository,
    private userRepository: UserRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const parsedData = mealSchema.safeParse(req.body)

    if (!parsedData.success) {
      return res
        .status(422)
        .json({ message: 'Validation error', errors: parsedData.error.issues })
    }

    const { name, description, is_cheat_meal: isCheatMeal } = parsedData.data

    const recordMealUsecase = new RecordMealUsecase(
      this.mealRepository,
      this.userRepository,
    )

    const meal = await recordMealUsecase.execute(
      { name, description, isCheatMeal },
      req.userId,
    )
    return res.status(201).json({ meal })
  }
}
