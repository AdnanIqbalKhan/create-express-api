import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger-output.json' assert {type: 'json'}
import AppRoutes from './src/routes/index.js'
import db from './src/utils/db.js'

const app = express()
const PORT = process.env.PORT || '3000'


app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.all('*', AppRoutes)

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})