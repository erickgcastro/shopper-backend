import { NextFunction, Request, Response } from "express"
import { NetworkError } from "~/domain/entities/network-error"

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction
) => {
  console.log(err)

  if (err instanceof NetworkError) {
    return res.status(err.statusCode).json({
      error_code: err.error_code,
      error_description: err.error_description,
    })
  }

  return res.status(500).json({
    error_code: "INTER_SERVER_ERROR",
    error_description: "An unexpected error occurred",
  })
}
