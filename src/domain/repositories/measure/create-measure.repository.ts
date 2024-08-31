import { Measure } from "@prisma/client"
import { MeasureType } from "~/domain/entities/measure.entity"

export interface ICreateMeasureRepository {
  create: (params: ICreateMeasureRepository.Params) => ICreateMeasureRepository.Result
}

export namespace ICreateMeasureRepository {
  export type Params = {
    customer_code: string
    image_url: string
    measure_datetime: string
    value: number
    measure_type: MeasureType
  }

  export type Result = Promise<Measure>
}
