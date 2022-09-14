import { Router } from "express"
import * as GenericMiddleware from '../middleware/generic'
import * as Middleware from '../middleware/user'
import * as Controller from '../controller/user'

const router = Router()

router.route('/')
    .get(Controller.getAll)
    .post(Middleware.create, Controller.create)

router.route('/:id')
    .get(GenericMiddleware.validateId, Controller.get)
    .put(GenericMiddleware.validateId, Middleware.update, Controller.update)
    .patch(GenericMiddleware.validateId, Middleware.update, Controller.update)
    .delete(GenericMiddleware.validateId, Controller.remove)

export = router