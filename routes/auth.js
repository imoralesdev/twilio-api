const { Router } = require('express')
const { DeleteToken } = require('../controllers/auth/DeleteToken.js')
const { GetToken } = require('../controllers/auth/GetToken.js')

const router = Router()

router.get('/', GetToken)
router.delete('/', DeleteToken)

module.exports = router