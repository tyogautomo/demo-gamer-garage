const express = require('express')
const router = express.Router()

const ControllerGame = require('../controllers/game-controller.js')

router.get('/', ControllerGame.getFive)

module.exports = router;