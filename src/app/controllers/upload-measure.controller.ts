import { Request, Response } from "express"
import { IController } from "../interface/controller.interface"
import { uploadDTO, type IUploadDTO } from "./dto/upload.dto"
import { ICreateMeasure } from "~/domain/services/interfaces/create-measure.interface"
import { NetworkError } from "~/domain/entities/network-error"

export class UploadMeasureController implements IController {
  constructor(private readonly service: ICreateMeasure) {}

  async handle(req: Request, res: Response) {
    let body: IUploadDTO
    try {
      body = uploadDTO.parse(req.body)
    } catch (error) {
      throw new NetworkError({
        error_code: "INVALID_DATA",
        statusCode: 400,
        error_description: "Os dados enviados são inválidos",
      })
    }

    const data = await this.service.execute(body)

    return res.json({
      image_url: data.image_url,
      measure_value: data.value,
      measure_uuid: data.id,
    })
  }
}
