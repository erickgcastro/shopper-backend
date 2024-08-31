import { Measure } from "@prisma/client"

export interface IConfirmMeasureValue {
  execute: (params: IConfirmMeasureValue.Params) => IConfirmMeasureValue.Result
}

export namespace IConfirmMeasureValue {
  export type Params = {
    id: string
    value: number
  }

  export type Result = Promise<Measure>
}
