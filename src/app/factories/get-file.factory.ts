import { Request, Response } from "express"
import { GetFileController } from "../controllers/get-file.controller"

export const getFileController = (req: Request, res: Response) => {
  const getFileController = new GetFileController()
  return getFileController.handle(req, res)
}
