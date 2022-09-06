const { connect, connection } = require('mongoose')
connect(process.env.DB_STRING,
    (err) => {
        if (err) console.error(err)
    })
const database = connection

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

module.exports = database