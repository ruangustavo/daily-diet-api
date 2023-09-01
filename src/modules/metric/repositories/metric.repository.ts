export interface MetricRepository {
  findTotalMealsRecorded(userId: string): Promise<number>
  findTotalMealsInsideDiet(userId: string): Promise<number>
}
