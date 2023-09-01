export interface MetricRepository {
  findTotalMealsRecorded(userId: string): Promise<number>
}
