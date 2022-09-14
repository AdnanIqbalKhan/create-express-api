import swaggerAutogen from 'swagger-autogen'
const doc = {
    info: {
        version: '1.0.0',
        title: 'Health Checkup Camp',
    },
}

const outputFile = 'swagger.json'
const endpointsFiles = ['../index.ts', '../routes/index.ts']


swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)