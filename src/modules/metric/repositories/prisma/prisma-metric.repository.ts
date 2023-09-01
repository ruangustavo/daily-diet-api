import { MetricRepository } from '../metric.repository'
import { prisma } from '@/infra/database/prisma'

export class PrismaMetricRepository implements MetricRepository {
  async findTotalMealsRecorded(userId: string): Promise<number> {
    const totalMealsRecorded = await prisma.meal.count({
      where: {
        userId,
      },
      orderBy: {
        eatenAt: 'asc',
      },
    })
    return totalMealsRecorded
  }

  async findTotalMealsInsideDiet(userId: string): Promise<number> {
    const totalMealsInsideDiet = await prisma.meal.count({
      where: {
        userId,
        isCheatMeal: false,
      },
    })
    return totalMealsInsideDiet
  }

  async findTotalMealsOutsideDiet(userId: string): Promise<number> {
    const totalMealsOutsideDiet = await prisma.meal.count({
      where: {
        userId,
        isCheatMeal: true,
      },
    })
    return totalMealsOutsideDiet
  }
}
