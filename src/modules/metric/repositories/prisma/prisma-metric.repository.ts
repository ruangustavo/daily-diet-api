import { MetricRepository } from '../metric.repository'
import { prisma } from '@/infra/database/prisma'

export class PrismaMetricRepository implements MetricRepository {
  async findTotalMealsRecorded(userId: string): Promise<number> {
    const totalMealsRecorded = await prisma.meal.count({
      where: {
        userId,
      },
    })
    return totalMealsRecorded
  }
}
