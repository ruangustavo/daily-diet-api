import { UserRepository } from '@/modules/user/repositories/user-repository'
import { MetricRepository } from '../../repositories/metric.repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found.error'

interface FindTotalMealsOutsideDietUsecaseRequest {
  userId: string
}

export class FindTotalMealsOutsideDietUsecase {
  constructor(
    private metricRepository: MetricRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId }: FindTotalMealsOutsideDietUsecaseRequest) {
    const existingUser = await this.userRepository.findById(userId)
    if (!existingUser) {
      throw new ResourceNotFoundError('User not found')
    }

    const totalMealsOutsideDiet =
      await this.metricRepository.findTotalMealsOutsideDiet(userId)

    return totalMealsOutsideDiet
  }
}
