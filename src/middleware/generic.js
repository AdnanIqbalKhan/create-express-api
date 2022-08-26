import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const Types = {
    String: 1,
    Number: 2,
    ObjectId: 3,
    Date: 4,
    Enum: 5  // Currently works only with enum of type string TODO: make it generic

}
Object.freeze(Types)

const validateId = (req, res, next) => {
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

const validateRequiredFields = (rules, inputData, typeName) => {
    const errors = validateFields(rules, inputData, typeName)
    rules.forEach(item => {
        if (item.required) {
            if (inputData[item.key] == null)
                errors.push(`${typeName} ${item.key} is required`)
        }
    })
    return errors
}

const validateFields = (rules, inputData, typeName) => {
    const errors = []
    let empty = 0
    rules.forEach(item => {
        const key = item.key
        if (key != null) {
            const value = inputData[key]
            if (value != null) {
                switch (item.type) {
                    case Types.String:
                        if (typeof value != 'string')
                            errors.push(`${typeName} ${key} is invalid`)
                        else {
                            if (value == '') {
                                errors.push(`${typeName} ${key} is empty`)
                            }
                        }
                        break
                    case Types.Number:
                        if (typeof value != 'number')
                            errors.push(`${typeName} ${key} is invalid`)
                        else {
                            if (item.min && value < item.min)
                                errors.push(`${typeName} ${key} must be greater than ${item.min}`)

                            if (item.max && value < item.max)
                                errors.push(`${typeName} ${key} must be less than ${item.max}`)
                        }
                        break

                    case Types.ObjectId:
                        if (!ObjectId.isValid(value))
                            errors.push(`${typeName} ${key} is invalid Id`)
                        break

                    case Types.Date:
                        if (new Date(value) == 'Invalid Date')
                            errors.push(`${typeName} ${key} is invalid Date`)
                        break
                    case Types.Enum:
                        if (typeof value != 'string')
                            errors.push(`${typeName} ${key} is invalid`)
                        else {
                            if (value == '') {
                                errors.push(`${typeName} ${key} is empty`)
                            }
                            if (item.enum && !item.enum.includes(value)) {
                                errors.push(`${typeName} ${key} value not allowed, valid values are ${item.enum}`)
                            }
                        }
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

    if (empty == rules.length) {
        errors.push(`${typeName}: No data to update`)
    }
    return errors
}

export {
    validateId, validateRequiredFields, validateFields, Types
}

export default {
    validateId, validateRequiredFields, validateFields
}
