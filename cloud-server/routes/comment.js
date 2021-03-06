const {Router} = require('express')
const router = Router()
const auth = require('../controller/auth')
const { doComment, getComment} = require('../controller/comment')

router.post('/', auth, doComment)
router.post('/get', getComment)

module.exports = router