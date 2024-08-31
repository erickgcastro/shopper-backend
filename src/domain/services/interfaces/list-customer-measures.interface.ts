import { Measure } from "@prisma/client"
import { MeasureType } from "~/domain/entities/measure.entity"

export interface IListCustomerMeasures {
  execute: (params: IListCustomerMeasures.Params) => IListCustomerMeasures.Result
}

export namespace IListCustomerMeasures {
  export type Params = {
    customer_code: string
    measure_type?: MeasureType
  }

  export type Result = Promise<Measure[]>
}
