
import { connect, connection } from 'mongoose'


connect(process.env.DB_STRING).
    catch(error => console.error('DB-ERROR: ', error))

const database = connection

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

export = database