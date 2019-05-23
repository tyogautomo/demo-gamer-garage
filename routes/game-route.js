const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/user-controller')
const ControllerGame = require('../controllers/game-controller')

router.get('/', ControllerGame.getAll)

router.get('/buy/:gamesId', ControllerGame.checkout)
router.post('/buy/:gamesId', ControllerGame.buy)


module.exports = router;