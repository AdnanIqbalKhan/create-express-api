import { Response, Request } from 'express'
import Generic from './generic'
import { IUser, User } from '../models/user'
const typeName = 'User'

const getAll = async (req: Request, res: Response) => {
    Generic.getAll<IUser>(req, res, typeName, User)
}

const get = async (req: Request<{ id: string }>, res: Response) => {
    Generic.get<IUser>(req, res, typeName, User)
}

const create = async (req: Request<any, any, IUser>, res: Response) => {
    Generic.create<IUser>(req, res, typeName, User)
}

const update = async (req: Request<{ id: string }, any, IUser>, res: Response) => {
    Generic.update<IUser>(req, res, typeName, User)
}

const remove = async (req: Request<{ id: string }>, res: Response) => {
    Generic.remove<IUser>(req, res, typeName, User)
}

export {
    get, getAll, create, update, remove
}