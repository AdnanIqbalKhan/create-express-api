import express, { Request, Response, NextFunction, Router } from 'express'
import userRoutes from './user'

const router: Router = express.Router()
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello')
})

router.use('/user', userRoutes)
export = router