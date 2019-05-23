const express = require('express')
const router = express.Router()

const ControllerUser = require('../controllers/user-controller')

router.get('/', (req, res) => {
    res.render('login.ejs')
})

module.exports = router;