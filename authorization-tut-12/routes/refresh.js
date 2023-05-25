const express = require('express')
const router = express.Router()
const handleRfereshToken = require('../controllers/refreshToken')


router.get('/', handleRfereshToken)

module.exports = router