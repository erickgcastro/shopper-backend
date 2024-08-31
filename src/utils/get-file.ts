import path from "node:path"

export const getFile = (file: string) => {
  const fileDir = path.resolve(
    __dirname,
    `${process.env.NODE_ENV === "DEV" ? "../" : ""}uploads`,
    file
  )
  return fileDir
}
