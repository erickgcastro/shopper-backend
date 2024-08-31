import { Request, Response } from "express"
import { IController } from "../interface/controller.interface"
import { getFile } from "~/utils/get-file"

export class GetFileController implements IController {
  async handle(req: Request, res: Response) {
    const { file } = req.params
    const fileDir = getFile(file)
    return res.sendFile(fileDir, (err) => {
      if (err) {
        return res.status(404).json({
          message: "File not found",
          statusCode: 404,
          details: "File not found",
        })
      }
    })
  }
}
