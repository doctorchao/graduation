const {Router} = require('express')
const router = Router()
const auth = require('../controller/auth')
const { doReturn, getReturn} = require('../controller/return')

router.post('/', auth, doReturn)
router.post('/get', getReturn)

module.exports = router