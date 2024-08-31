import { Request, Response } from "express"
import { MeasureRepository } from "~/infra/respositories/measure.repository"
import { ConfirmMeasureValueService } from "~/domain/services/confirm-measure-value.service"
import { ConfirmMeasureValueController } from "../controllers/confirm-measure-value.controller"

export const confirmMeasureValueController = (req: Request, res: Response) => {
  const measureRepository = new MeasureRepository()
  const confirmMeasureValueService = new ConfirmMeasureValueService(measureRepository)
  const confirmMeasureValueController = new ConfirmMeasureValueController(
    confirmMeasureValueService
  )
  return confirmMeasureValueController.handle(req, res)
}
