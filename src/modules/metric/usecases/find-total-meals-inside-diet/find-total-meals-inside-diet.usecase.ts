import { UserRepository } from '@/modules/user/repositories/user-repository'
import { MetricRepository } from '../../repositories/metric.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

interface FindTotalMealsInsideDietUsecaseRequest {
  userId: string
}

export class FindTotalMealsInsideDietUsecase {
  constructor(
    private metricRepository: MetricRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId }: FindTotalMealsInsideDietUsecaseRequest) {
    const existingUser = await this.userRepository.findById(userId)
    if (!existingUser) {
      throw new ResourceNotFoundError('User not found')
    }

    const totalMealsInsideDiet =
      await this.metricRepository.findTotalMealsInsideDiet(userId)

    return totalMealsInsideDiet
  }
}
