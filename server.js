const express = require("express")
const cors = require('cors')
const AppRoutes = require('./src/routes/index.js')

function createServer () {
    const app = express()
    app.use(cors())
    app.use(express.json())
    if (process.env.development == 'true') {
        console.log("LOG: running development server")
        const swaggerUi = require('swagger-ui-express')
        const swaggerDocument = require('./swagger-output.json')
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    } else {
        console.log("LOG: running production server")
    }
    app.all('*', AppRoutes)


    return app
}

module.exports = createServer