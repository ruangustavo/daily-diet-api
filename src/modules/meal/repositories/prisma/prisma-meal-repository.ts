import { Meal, Prisma } from '@prisma/client'
import { MealRepository } from '../meal.repository'
import { prisma } from '@/infra/database/prisma'

export class PrismaMealRepository implements MealRepository {
  async register(meal: Prisma.MealCreateInput): Promise<Meal> {
    const mealCreated = await prisma.meal.create({
      data: {
        ...meal,
      },
    })
    return mealCreated
  }
}
