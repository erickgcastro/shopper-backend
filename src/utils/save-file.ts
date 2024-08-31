import fs from "node:fs"
import path from "node:path"
import { NetworkError } from "~/domain/entities/network-error"

const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/heic", "image/heif"]

export const saveFile = (image: string) => {
  const [imageInfo, base64Data] = image.split(",")
  const mimeType = imageInfo.split(";")[0].replace("data:", "")

  if (!allowedTypes.includes(mimeType)) {
    throw new NetworkError({
      error_code: "INVALID_DATA",
      statusCode: 400,
      error_description: "Os dados enviados são inválidos",
    })
  }

  const buffer = Buffer.from(base64Data, "base64")

  const imageName = Date.now().toString() + `.${mimeType.split("/")[1]}`
  const uploadDir = path.join(
    __dirname,
    `${process.env.NODE_ENV === "DEV" ? "../" : ""}uploads`
  )
  const imagePath = path.join(uploadDir, imageName)

  console.log(imagePath)

  fs.writeFileSync(imagePath, buffer)

  return { imageName, imagePath, mimeType }
}
