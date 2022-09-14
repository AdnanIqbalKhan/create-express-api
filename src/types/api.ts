import { ObjectId } from "mongoose"

type Rules = {
    [key: string]: {
        required: boolean
        type: typeof String | typeof Number | typeof Date | typeof Boolean | ObjectId
        enum?: Array<String | Number | Date | ObjectId>
        min?: number
        max?: number
    }
}

export { Rules }