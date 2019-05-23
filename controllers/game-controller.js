const Model = require('../models/index.js')
const Game = Model.Game
const User = Model.User
const UserGame = Model.UserGame


class ControllerGame {

    static getFive(req, res) {
        Game.findAll({
                order: [
                    ['rating', 'DESC']
                ],
                limit: 5
            })
            .then(allGames => {
                // console.log(allGames)
                res.render('home.ejs', {
                    allGames: allGames
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getAll(req, res) {
        Game.findAll({
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(allGames => {
                // console.log(allGames)
                res.render('games.ejs', {
                    user: req.session.currentUser,
                    allGames: allGames
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static checkout(req, res) {
        Game.findOne({
                where: {
                    id: req.params.gamesId
                }
            })
            .then(game => {
                console.log(game)
                res.render('checkout.ejs', {
                    game: game.dataValues
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static buy(req, res) {


        if (req.session.currentUser) {

            User.findOne({
                    where: {
                        id: req.session.currentUser.id
                    }
                })
                .then(user => {
                    // res.send(user)
                    return user.balance
                })


                .then(userBalance => {
                    let data = {
                        UserId: req.session.currentUser.id,
                        GameId: req.params.gamesId
                    }
                    Game.findByPk(req.params.gamesId)
                        .then(game => {
                            if (userBalance >= game.dataValues.price) {
                                UserGame.create(data)
                                    .then(() => {
                                        let change = userBalance - game.dataValues.price
                                        let update = {
                                            balance: change
                                        }
                                        console.log(change)
                                        User.update(update, {
                                                where: {
                                                    id: req.session.currentUser.id
                                                }
                                            })
                                            .then(() => {
                                                res.send(`SUCCESS!!`)
                                            })
                                    })
                            } else {
                                res.send(`Not enough money`)
                            }
                        })
                })
        } else {
            res.render('loginfirst.ejs')
        }
    }

}

module.exports = ControllerGame;