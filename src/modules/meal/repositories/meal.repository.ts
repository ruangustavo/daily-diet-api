import { Meal, Prisma } from '@prisma/client'

export interface MealRepository {
  record(meal: Prisma.MealCreateInput): Promise<Meal>
  update(id: string, meal: Prisma.MealUpdateInput): Promise<Meal>
  findById(id: string): Promise<Meal | null>
  findAllByUserId(userId: string): Promise<Meal[]>
  delete(id: string): Promise<boolean>
}
