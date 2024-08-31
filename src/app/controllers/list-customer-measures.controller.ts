import { Request, Response } from "express"
import { IController } from "../interface/controller.interface"
import z from "zod"
import { IListCustomerMeasures } from "~/domain/services/interfaces/list-customer-measures.interface"
import { MeasureType } from "~/domain/entities/measure.entity"
import { NetworkError } from "~/domain/entities/network-error"

export const queryDTO = z.object({
  measure_type: z.enum([MeasureType.GAS, MeasureType.WATER]).optional(),
})

export class ListCustomerMeasuresController implements IController {
  constructor(private readonly service: IListCustomerMeasures) {}

  async handle(req: Request, res: Response) {
    const { customerCode } = req.params

    let measure_type: MeasureType | undefined = undefined
    try {
      measure_type = queryDTO.parse(req.query).measure_type
    } catch (error) {
      throw new NetworkError({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida",
        statusCode: 400,
      })
    }

    const list = await this.service.execute({
      customer_code: customerCode,
      measure_type: measure_type,
    })

    if (list.length === 0) {
      throw new NetworkError({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada",
        statusCode: 400,
      })
    }

    return res.json({
      customer_code: customerCode,
      measures: list.map((v) => ({
        measure_uuid: v.id,
        measure_datetime: v.measure_datetime,
        measure_type: v.measure_type,
        has_confirmed: v.has_confirmed,
        image_url: v.image_url,
      })),
    })
  }
}
