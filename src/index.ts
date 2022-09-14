import 'dotenv/config'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import AppRoutes from './routes'
import './utils/db'
const PORT = process.env.PORT || '3000'

const app: Express = express()


app.use(cors())
app.use(express.json())
if (process.env.ENV == "development") {
  console.log("LOG: running development server")
  // import('swagger-ui-express').then(swaggerUi => {
  //   const swaggerDocument = require('../src/swagger/swagger.json')
  //   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  // })
} else {
  console.log("LOG: running production server")
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
app.all('*', AppRoutes)