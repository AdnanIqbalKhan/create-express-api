import { Schema, model } from 'mongoose'
import { Rules } from 'types/api'

// 1. Create an interface representing a document in MongoDB.
interface IUser {
    name: string
    age: number
}

// 2. Create a Schema corresponding to the document interface.
const RUser: Rules = {
    name: { type: String, required: true },
    age: { type: Number, required: true }
}

const userSchema = new Schema<IUser>(RUser)

// 3. Create a Model.
const User = model<IUser>('User', userSchema)

export { IUser, RUser, User }