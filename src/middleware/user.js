import { Types, validateRequiredFields, validateFields } from './generic.js'

const typeName = 'User'

const rules = [{
    key: 'name',
    required: true,
    type: Types.String
}, {
    key: 'age',
    required: true,
    type: Types.Number,
    min: 0
}
]

const create = (req, res, next) => {
    const errors = validateRequiredFields(rules, req.body, typeName)
    if (errors.length == 0) {
        next()
    } else {
        res.status(404).send({ 'message': 'Insufficient request data', error: errors })
    }
}

const update = (req, res, next) => {
    const errors = validateFields(rules, req.body, typeName)
    if (errors.length == 0) {
        next()
    } else {
        res.status(404).send({ 'message': 'Insufficient request data', error: errors })
    }
}

export default {
    create, update
}