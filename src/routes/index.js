import { Router } from 'express'
import userRoutes from './user.js'
import userSlotRoutes from './user_slot.js'
import checkupVenueRoutes from './checkup_venue.js'

const router = Router()
router.get('/', (req, res, next) => {

  res.send('Hello')
})

router.use('/user', userRoutes)
router.use('/slot', userSlotRoutes)
router.use('/venue', checkupVenueRoutes)

export default router