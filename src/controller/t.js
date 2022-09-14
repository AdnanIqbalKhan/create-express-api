import { Response, Request } from 'express'
import Generic from './generic'
import { IUser, User } from '../models/user'
const typeName = 'User'

const getAll = async (req: Request, res: Response) => {
    /*
    #swagger.tags = ['User']
    #swagger.description = 'Get All User'
    #swagger.operationId = 'get_all_user'
    */
    Generic.getAll < IUser > (req, res, typeName, User)
}

const get = async (req: Request<{ id: string }>, res: Response) => {
    /*
    #swagger.tags = ['User']
    #swagger.description = 'Get User'
    #swagger.operationId = 'get_user'
    #swagger.parameters['id'] = {
        required: true,
        type: "ObjectId"
    }
    */
    Generic.get < IUser > (req, res, typeName, User)
}

const create = async (req: Request<{}, { data: IUser }>, res: Response) => {
    /*
    #swagger.tags = ['User']
    #swagger.description = 'Create User'
    #swagger.operationId = 'create_user'
    #swagger.requestBody = {
        required: true,
        "@content": {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        age: {
                            type: "number"
                        }
                    },
                    required: ["name", "age"]
                }
            }
        } 
    }
    */
    Generic.create < IUser > (req, res, typeName, User)
}

const update = async (req: Request<{ id: string }>, res: Response) => {
    /*
    #swagger.tags = ['User']
    #swagger.description = 'Update User'
    #swagger.operationId = 'update_user'
    #swagger.parameters['id'] = {
        required: true,
        type: "ObjectId"
    }
    #swagger.requestBody = {
        required: true,
        "@content": {
            "multipart/form-data": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        age: {
                            type: "number"
                        }
                    },
                }
            }
        } 
    }
    */
    Generic.update < IUser > (req, res, typeName, User)
}

const remove = async (req: Request<{ id: string }>, res: Response) => {
    /*
    #swagger.tags = ['User']
    #swagger.description = 'Remove User'
    #swagger.operationId = 'remove_user'
    #swagger.parameters['id'] = {
        required: true,
        type: "ObjectId"
    }
    */
    Generic.remove < IUser > (req, res, typeName, User)
}

export {
    get, getAll, create, update, remove
}