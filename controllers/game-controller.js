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
            let data = {
                UserId: req.session.currentUser.id,
                GameId: req.params.gamesId
            }

            UserGame.create(data)
                .then(() => {
                    res.send(`success`)
                })
                .catch(err => {
                    res.send(err)
                })
        } else {
            res.send(`You must login first`)
        }
    }

}

module.exports = ControllerGame;