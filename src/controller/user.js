const Model = require('../models/user.js')
const Generic = require('./generic.js')
const typeName = 'User'

const getAll = async (req, res) => {
    /*
    #swagger.tags = ['User']
    #swagger.description = 'Get All User'
    #swagger.operationId = 'get_all_user'
    */
    Generic.getAll(req, res, typeName, Model)
}

const get = async (req, res) => {
    /*
    #swagger.tags = ['User']
    #swagger.description = 'Get User'
    #swagger.operationId = 'get_user'
    #swagger.parameters['id'] = {
        required: true,
        type: "ObjectId"
    }
    */
    Generic.get(req, res, typeName, Model)
}

const create = async (req, res) => {
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
    Generic.create(req, res, typeName, Model)
}

const update = async (req, res) => {
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
    Generic.update(req, res, typeName, Model)
}

const remove = async (req, res) => {
    /*
    #swagger.tags = ['User']
    #swagger.description = 'Remove User'
    #swagger.operationId = 'remove_user'
    #swagger.parameters['id'] = {
        required: true,
        type: "ObjectId"
    }
    */
    Generic.remove(req, res, typeName, Model)
}

module.exports = {
    get, getAll, create, update, remove
}