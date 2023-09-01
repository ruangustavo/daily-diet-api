import { Request, Response } from 'express'
import { MetricRepository } from '../../repositories/metric.repository'
import { UserRepository } from '@/modules/user/repositories/user-repository'
import { FindTotalMealsOutsideDietUsecase } from './find-total-meals-outside-diet.usecase'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

export class FindTotalMealsOutsideDietController {
  constructor(
    private metricRepository: MetricRepository,
    private userRepository: UserRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { userId } = req

    const findTotalMealsOutsideDietUsecase =
      new FindTotalMealsOutsideDietUsecase(
        this.metricRepository,
        this.userRepository,
      )

    try {
      const totalMealsOutsideDiet =
        await findTotalMealsOutsideDietUsecase.execute({
          userId,
        })
      return res
        .status(200)
        .json({ total_meals_outside_diet: totalMealsOutsideDiet })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message })
      }
    }
  }
}
