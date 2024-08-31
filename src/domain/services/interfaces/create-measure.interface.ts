import { Measure } from "@prisma/client"
import { MeasureType } from "~/domain/entities/measure.entity"

export interface ICreateMeasure {
  execute: (params: ICreateMeasure.Params) => ICreateMeasure.Result
}

export namespace ICreateMeasure {
  export type Params = {
    image: string
    customer_code: string
    measure_datetime: string
    measure_type: MeasureType
  }

  export type Result = Promise<Measure>
}
