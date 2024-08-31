import { Measure } from "@prisma/client"
import { MeasureType } from "~/domain/entities/measure.entity"

export interface IGetMeasuresByCustomerCodeRepository {
  getByCustomerCode: (
    code: string,
    options?: IGetMeasuresByCustomerCodeRepository.Options
  ) => IGetMeasuresByCustomerCodeRepository.Result
}

export namespace IGetMeasuresByCustomerCodeRepository {
  export type Options =
    | {
        measure_type?: MeasureType
      }
    | undefined
  export type Result = Promise<Measure[]>
}
