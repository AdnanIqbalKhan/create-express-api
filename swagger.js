const swaggerAutogen = require('swagger-autogen')
const doc = {
    info: {
        version: '1.0.0',
        title: 'Health Checkup Camp',
    },
}

const outputFile = 'swagger-output.json'
const endpointsFiles = ['index.js', './src/routes/index.js']


swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)