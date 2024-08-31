import path from "node:path"

export const getFile = (file: string) => {
  const fileDir = path.resolve(__dirname, "..", "uploads", file)
  return fileDir
}
