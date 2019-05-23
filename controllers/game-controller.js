const Model = require('../models/index.js')
const Game = Model.Game

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ControllerGame {

    static getAll(req, res) {
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

}

module.exports = ControllerGame;