const { Router } = require('express')
const GenericMiddleware = require('../middleware/generic.js')
const Middleware = require('../middleware/user.js')
const Controller = require('../controller/user.js')

const router = Router()

router.route('/')
    .get(Controller.getAll)
    .post(Middleware.create, Controller.create)

router.route('/:id')
    .get(GenericMiddleware.validateId, Controller.get)
    .put(GenericMiddleware.validateId, Middleware.update, Controller.update)
    .delete(GenericMiddleware.validateId, Controller.remove)

module.exports = router