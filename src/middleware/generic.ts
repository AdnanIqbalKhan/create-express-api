import { Rules } from '../types/api'
import { Request, Response, NextFunction } from "express"
import mongoose, { ObjectId } from "mongoose"

const ObjectId = mongoose.Types.ObjectId

const validateId = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const errors = []
    if (req.params.id == null)
        errors.push('Id is required')

    if (!ObjectId.isValid(req.params.id))
        errors.push('Incorrect Id')

    if (errors.length == 0) {
        next()
    } else {
        res.status(404).send({ 'message': 'Insufficient request data', error: errors })
    }
}

function validateRequiredFields<T>(rules: Rules, inputData: T, typeName: string) {
    const errors = validateFields<T>(rules, inputData, typeName)
    Object.keys(rules).forEach(key => {
        const item = rules[key]
        if (item.required) {
            if (!(key in inputData))
                errors.push(`${typeName} ${key} is required`)
        }
    })
    return errors
}

function validateFields<T>(rules: Rules, inputData: T, typeName: string): Array<string> {
    const errors = []
    type K = keyof typeof inputData
    let empty = 0
    Object.keys(rules).forEach(key => {
        const item = rules[key]
        if (key != null && key in inputData) {
            const value = String(inputData[key as K])
            if (value != null) {
                switch (typeof item.type) {
                    case typeof Boolean:
                        if (typeof value == "boolean")
                            errors.push(`${typeName} ${key} is invalid`)
                        break

                    case typeof String:
                        if (typeof value != 'string')
                            errors.push(`${typeName} ${key} is invalid`)
                        else {
                            if (value == '')
                                errors.push(`${typeName} ${key} is empty`)

                            if (item.enum && item.enum.length > 0 && !item.enum.includes(value))
                                errors.push(`${typeName} ${key} value not allowed, valid values are ${item.enum}`)
                        }
                        break
                    case typeof Number:
                        if (isNaN(Number(value)))
                            errors.push(`${typeName} ${key} is invalid`)
                        else {
                            if (item.enum && item.enum.length > 0 && !item.enum.includes(value))
                                errors.push(`${typeName} ${key} value not allowed, valid values are ${item.enum}`)

                            if (item.min && Number(value) < item.min)
                                errors.push(`${typeName} ${key} must be greater than ${item.min}`)

                            if (item.max && Number(value) < item.max)
                                errors.push(`${typeName} ${key} must be less than ${item.max}`)
                        }
                        break
                    case typeof ObjectId:
                        if (!ObjectId.isValid(value))
                            errors.push(`${typeName} ${key} is invalid Id`)
                        else
                            if (item.enum && item.enum.length > 0 && !item.enum.includes(value))
                                errors.push(`${typeName} ${key} value not allowed, valid values are ${item.enum}`)
                        break



                    case typeof Date:
                        if (isNaN(Date.parse(value)))
                            errors.push(`${typeName} ${key} is invalid Date`)
                        else
                            if (item.enum && item.enum.length > 0 && !item.enum.includes(value))
                                errors.push(`${typeName} ${key} value not allowed, valid values are ${item.enum}`)
                        break
                    default:
                        errors.push(`${typeName} ${key} is wrong`)
                        break
                }
            } else {
                empty++
            }
        }
    })

    if (empty == Object.keys(rules).length) {
        errors.push(`${typeName}: No data to update`)
    }
    return errors
}

export {
    Rules, validateId, validateRequiredFields, validateFields
}
