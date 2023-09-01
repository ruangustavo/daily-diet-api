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

  async update(id: string, meal: Prisma.MealUpdateInput): Promise<Meal> {
    const mealUpdated = await prisma.meal.update({
      where: {
        id,
      },
      data: {
        ...meal,
      },
    })
    return mealUpdated
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })
    return meal
  }

  async delete(id: string): Promise<boolean> {
    const result = await prisma.meal.delete({
      where: {
        id,
      },
    })
    return !!result
  }
}
