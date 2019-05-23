const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/user-controller.js')

router.get('/', (req, res) => {
    res.render('register.ejs')
})
router.post('/', ControllerUser.register)

module.exports = router;