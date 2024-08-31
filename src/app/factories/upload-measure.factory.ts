import { Request, Response } from "express"
import { CreateMeasureService } from "~/domain/services/create-measure.service"
import { MeasureRepository } from "~/infra/respositories/measure.repository"
import { UploadMeasureController } from "../controllers/upload-measure.controller"

export const uploadMeasureController = (req: Request, res: Response) => {
  const measureRepository = new MeasureRepository()
  const createMeasureService = new CreateMeasureService(measureRepository)
  const uploadMeasureController = new UploadMeasureController(createMeasureService)
  return uploadMeasureController.handle(req, res)
}
