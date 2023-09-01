import { Request, Response } from 'express'
import { MetricRepository } from '../../repositories/metric.repository'
import { UserRepository } from '@/modules/user/repositories/user-repository'
import { FindTotalMealsInsideDietUsecase } from './find-total-meals-inside-diet.usecase'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

export class FindTotalMealsInsideDietController {
  constructor(
    private metricRepository: MetricRepository,
    private userRepository: UserRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { userId } = req

    const findTotalMealsInsideDietUsecase = new FindTotalMealsInsideDietUsecase(
      this.metricRepository,
      this.userRepository,
    )

    try {
      const totalMealsInsideDiet =
        await findTotalMealsInsideDietUsecase.execute({
          userId,
        })
      return res
        .status(200)
        .json({ total_meals_inside_diet: totalMealsInsideDiet })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message })
      }
    }
  }
}
