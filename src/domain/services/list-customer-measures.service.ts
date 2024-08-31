import { IGetMeasuresByCustomerCodeRepository } from "../repositories/measure/get-measures-by-customer-code.repository"
import { IListCustomerMeasures } from "./interfaces/list-customer-measures.interface"

export class ListCustomerMeasuresService implements IListCustomerMeasures {
  constructor(private readonly measureRepository: IGetMeasuresByCustomerCodeRepository) {}

  async execute(params: IListCustomerMeasures.Params): IListCustomerMeasures.Result {
    const list = await this.measureRepository.getByCustomerCode(params.customer_code, {
      measure_type: params.measure_type,
    })
    return list
  }
}
