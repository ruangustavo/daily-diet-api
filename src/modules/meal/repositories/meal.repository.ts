import { Meal, Prisma } from '@prisma/client'

export interface MealRepository {
  register(meal: Prisma.MealCreateInput): Promise<Meal>
}
