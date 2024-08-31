import { Measure } from "@prisma/client"

export interface IGetMeasureByMonthRepository {
  getByMounth: (mounth: number) => IGetMeasureByMonthRepository.Result
}

export namespace IGetMeasureByMonthRepository {
  export type Result = Promise<Measure[]>
}
