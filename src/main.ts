import "dotenv/config"
import "express-async-errors"
import express from "express"
import cors from "cors"
import { routes } from "./app/routes/routes"
import { errorHandler } from "./app/middlewares/error-handler.middleware"

function main() {
  const app = express()
  app.use(cors())
  app.use(express.json({ limit: "50mb" }))
  app.use(routes)
  app.use(errorHandler)

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Running...`))
}

main()
