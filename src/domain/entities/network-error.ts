type Props = {
  error_code?: string
  statusCode?: number
  error_description?: string
}

export class NetworkError extends Error {
  public error_code: string
  public statusCode: number
  public error_description: string

  constructor(params: Props) {
    super(params.error_code)
    this.error_code = params.error_code || "NetworkError"
    this.statusCode = params.statusCode || 400
    this.error_description = params.error_description || ""
  }
}
