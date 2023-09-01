import { ResourceNotFoundError } from '@/errors/resource-not-found.error'
import { UserRepository } from '@/modules/user/repositories/user-repository'
import { MetricRepository } from '../../repositories/metric.repository'

interface FindTotalMealsRecordedRequest {
  userId: string
}

export class FindTotalMealsRecordedUsecase {
  constructor(
    private metricRepository: MetricRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId }: FindTotalMealsRecordedRequest) {
    const existingUser = await this.userRepository.findById(userId)
    if (!existingUser) {
      throw new ResourceNotFoundError('User not found')
    }

    const totalMealsRecorded =
      await this.metricRepository.findTotalMealsRecorded(userId)

    return totalMealsRecorded
  }
}
