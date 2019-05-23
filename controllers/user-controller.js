const Model = require('../models/index.js')
const User = Model.User

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ControllerUser {

    static register(req, res) {
        let data = {
            username: req.body.username,
            email: req.body.email,
            password: Number(req.body.password),
            balance: 0
        }

        User.create(data)
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerUser;