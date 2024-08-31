import { Router } from "express"
import { uploadMeasureController } from "../factories/upload-measure.factory"
import { confirmMeasureValueController } from "../factories/confirm-measure-value.factory"
import { listCustomerMeasuresController } from "../factories/list-customer-measures.factory"
import { getFileController } from "../factories/get-file.factory"

export const routes = Router()

routes.post("/upload", uploadMeasureController)
routes.patch("/confirm", confirmMeasureValueController)
routes.get("/files/:file", getFileController)
routes.get("/:customerCode/list", listCustomerMeasuresController)
