import { Measure } from "@prisma/client"

export interface IGetMeasureByIdRepository {
  getById: (id: string) => IGetMeasureByIdRepository.Result
}

export namespace IGetMeasureByIdRepository {
  export type Result = Promise<Measure | null>
}
