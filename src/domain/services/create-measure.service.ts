import { ICreateMeasureRepository } from "../repositories/measure/create-measure.repository"
import { type ICreateMeasure } from "./interfaces/create-measure.interface"
import { GoogleAIFileManager } from "@google/generative-ai/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { NetworkError } from "../entities/network-error"
import { IGetMeasureByMonthRepository } from "../repositories/measure/get-measure-by-month.repository"
import { saveFile } from "~/utils/save-file"

export class CreateMeasureService implements ICreateMeasure {
  constructor(
    private readonly measureRepository: ICreateMeasureRepository &
      IGetMeasureByMonthRepository
  ) {}

  async execute(params: ICreateMeasure.Params): ICreateMeasure.Result {
    const dateNow = new Date()
    const measureByMonth = await this.measureRepository.getByMounth(
      dateNow.getMonth() + 1
    )

    if (measureByMonth.length > 0) {
      throw new NetworkError({
        error_code: "DOUBLE_REPORT",
        statusCode: 409,
        error_description: "Leitura do mês já realizada",
      })
    }

    const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const geminiModel = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY)

    const { imageName, imagePath, mimeType } = saveFile(params.image)

    const uploadResponse = await fileManager.uploadFile(imagePath, {
      mimeType,
      displayName: imageName,
    })

    const prompt = `Analyze the image of a meter and extract the reading value. Return only the number as an integer.`
    const {
      response: { candidates },
    } = await geminiModel.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: prompt },
    ])

    if (!candidates) {
      throw new NetworkError({
        error_code: "GEMINI_API_ERROR",
        statusCode: 400,
        error_description: "Não foi possível processar a imagem",
      })
    }

    const value = candidates[0].content.parts[0].text?.replace(/\D/g, "")
    if (value == undefined || Number.isNaN(+value)) {
      throw new NetworkError({
        error_code: "GEMINI_API_ERROR",
        statusCode: 400,
        error_description: "Não foi possível processar a imagem",
      })
    }

    const result = await this.measureRepository.create({
      value: +value,
      image_url: `http://localhost:${process.env.PORT || 5000}/files/${imageName}`,
      ...params,
    })

    return result
  }
}
