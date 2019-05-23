const Model = require('../models/index.js')
const User = Model.User

let bcrypt = require('bcryptjs')

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

    static login(req, res) {
        User.findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(user => {
                if (user) {
                    // console.log(user);
                    let check = bcrypt.compareSync(req.body.password, user.password)
                    if (check) {
                        req.session.currentUser = {
                            id: user.dataValues.id,
                            name: user.dataValues.username,
                            email: user.dataValues.email,
                            balance: user.dataValues.balance
                        }
                        res.redirect('/users/' + req.session.currentUser.name)
                        // res.send(`Success Login`)
                    } else {
                        res.send(`Wrong Password`)
                    }
                } else {
                    res.send(`Wrong username`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static userPage(req, res) {
        console.log(req.session.currentUser)
        User.findOne({
                where: {
                    id: req.session.currentUser.id
                }
            })
            .then(user => {
                if (user) {
                    res.render('user-page.ejs', {
                        balance: user.balance,
                        user: req.session.currentUser || null
                    })
                } else {
                    res.redirect('/login')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.currentUser = {}
        res.redirect('/')
    }

    static topUp(req, res) {
        User.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(user => {
                res.render('topup.ejs', {

                })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static pay(req, res) {
        let currentBalance = 0;
        User.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(user => {
                console.log(user.balance)
                currentBalance = user.balance
            })
            .catch(err => {
                res.send(err)
            })

        // console.log(currentBalance)
        let money = currentBalance + req.body.money
        let update = {
            balance: money
        }
        User.update(update, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect(`/`)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerUser;