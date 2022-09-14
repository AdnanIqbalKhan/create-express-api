import { Request, Response, NextFunction } from "express"
import { IUser, RUser } from "../models/user"
import { validateRequiredFields, validateFields } from './generic'

const typeName = 'User'


const create = (req: Request, res: Response, next: NextFunction) => {
    const errors = validateRequiredFields<IUser>(RUser, req.body, typeName)
    if (errors.length == 0) {
        next()
    } else {
        res.status(404).send({ 'message': 'Insufficient request data', error: errors })
    }
}

const update = (req: Request, res: Response, next: NextFunction) => {
    const errors = validateFields<IUser>(RUser, req.body, typeName)
    if (errors.length == 0) {
        next()
    } else {
        res.status(404).send({ 'message': 'Insufficient request data', error: errors })
    }
}

export {
    create, update
}