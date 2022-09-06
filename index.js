require('dotenv').config()
const createServer = require("./server")
require('./src/utils/db.js')
const PORT = process.env.PORT || '3000'

const app = createServer()

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})

