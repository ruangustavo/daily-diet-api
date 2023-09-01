import { Request, Response } from 'express'
import { MetricRepository } from '../../repositories/metric.repository'
import { UserRepository } from '@/modules/user/repositories/user-repository'
import { FindTotalMealsRecordedUsecase } from './find-total-meals-recorded.usecase'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

export class FindTotalMealsRecordedController {
  constructor(
    private metricRepository: MetricRepository,
    private userRepository: UserRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { userId } = req

    const findTotalMealsRecordedUsecase = new FindTotalMealsRecordedUsecase(
      this.metricRepository,
      this.userRepository,
    )

    try {
      const totalMealsRecorded = await findTotalMealsRecordedUsecase.execute({
        userId,
      })
      return res.status(200).json({ total_meals_recorded: totalMealsRecorded })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message })
      }
    }
  }
}
