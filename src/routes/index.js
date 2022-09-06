const { Router } = require('express')
const userRoutes = require('./user.js')

const router = Router()
router.get('/', (req, res, next) => {

  res.send('Hello')
})

router.use('/user', userRoutes)

module.exports = router