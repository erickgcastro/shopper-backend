import { Request, Response } from "express"
import type { IController } from "../interface/controller.interface"
import { IConfirmMeasureValue } from "~/domain/services/interfaces/confirm-measure-value.interface"
import {
  confirmMeasureValueDTO,
  type IConfirmMeasureValueDTO,
} from "./dto/confirm-measure-value.dto"
import { NetworkError } from "~/domain/entities/network-error"

export class ConfirmMeasureValueController implements IController {
  constructor(private readonly service: IConfirmMeasureValue) {}

  async handle(req: Request, res: Response) {
    let body: IConfirmMeasureValueDTO
    try {
      body = confirmMeasureValueDTO.parse(req.body)
    } catch (error) {
      throw new NetworkError({
        error_code: "INVALID_DATA",
        statusCode: 400,
        error_description: "Os dados enviados são inválidos",
      })
    }

    await this.service.execute({
      id: body.measure_uuid,
      value: body.confirmed_value,
    })

    return res.json({
      success: true,
    })
  }
}
