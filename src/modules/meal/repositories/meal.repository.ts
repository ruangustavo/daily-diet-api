import { Meal, Prisma } from '@prisma/client'

export interface MealRepository {
  register(meal: Prisma.MealCreateInput): Promise<Meal>
  update(id: string, meal: Prisma.MealUpdateInput): Promise<Meal>
  findById(id: string): Promise<Meal | null>
}
