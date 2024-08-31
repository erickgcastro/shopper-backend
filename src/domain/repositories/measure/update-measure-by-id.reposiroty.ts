import { Measure } from "@prisma/client"
import { MeasureType } from "~/domain/entities/measure.entity"

export interface IUpdateMeasureByIdRepository {
  update: (
    params: IUpdateMeasureByIdRepository.Params
  ) => IUpdateMeasureByIdRepository.Result
}

export namespace IUpdateMeasureByIdRepository {
  export type Params = {
    id: string
    data: Partial<{
      customer_code: string
      image_url: string
      measure_datetime: string
      value: number
      measure_type: MeasureType
      has_confirmed: boolean
    }>
  }

  export type Result = Promise<Measure>
}
