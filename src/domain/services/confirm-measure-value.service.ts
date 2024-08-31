import { NetworkError } from "../entities/network-error"
import { IGetMeasureByIdRepository } from "../repositories/measure/get-measure-by-id.repository"
import { IUpdateMeasureByIdRepository } from "../repositories/measure/update-measure-by-id.reposiroty"
import { IConfirmMeasureValue } from "./interfaces/confirm-measure-value.interface"

export class ConfirmMeasureValueService implements IConfirmMeasureValue {
  constructor(
    private readonly measureRepository: IGetMeasureByIdRepository &
      IUpdateMeasureByIdRepository
  ) {}

  async execute(params: IConfirmMeasureValue.Params): IConfirmMeasureValue.Result {
    const findMeasure = await this.measureRepository.getById(params.id)
    if (!findMeasure) {
      throw new NetworkError({
        error_code: "MEASURE_NOT_FOUND",
        statusCode: 404,
        error_description: "",
      })
    }

    if (findMeasure.has_confirmed) {
      throw new NetworkError({
        error_code: "CONFIRMATION_DUPLICATE",
        statusCode: 409,
        error_description: "Leitura do mês já realizada",
      })
    }

    return await this.measureRepository.update({
      id: params.id,
      data: {
        value: params.value,
        has_confirmed: true,
      },
    })
  }
}
