import mongoose from 'mongoose'

mongoose.connect(process.env.DB_STRING,
    (err) => {
        if (err) console.error(err)
    })
const database = mongoose.connection

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

export default database