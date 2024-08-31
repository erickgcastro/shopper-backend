import { Request, Response } from "express"
import { MeasureRepository } from "~/infra/respositories/measure.repository"
import { ListCustomerMeasuresService } from "~/domain/services/list-customer-measures.service"
import { ListCustomerMeasuresController } from "../controllers/list-customer-measures.controller"

export const listCustomerMeasuresController = (req: Request, res: Response) => {
  const measureRepository = new MeasureRepository()
  const listCustomerMeasuresService = new ListCustomerMeasuresService(measureRepository)
  const listCustomerMeasuresController = new ListCustomerMeasuresController(
    listCustomerMeasuresService
  )
  return listCustomerMeasuresController.handle(req, res)
}
