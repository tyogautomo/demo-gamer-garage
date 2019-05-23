'use strict';

let crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Wrong email format'
        }
      }
    },
    password: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };

  User.addHook('beforeCreate', 'encryptPassword', (user, option) => {
    let secret = require('../salt.js')

    user.password = `${user.password}`

    const hash = crypto.createHmac('sha256', secret)
      .update(user.password)
      .digest('hex')

    console.log("MASUK============================")
    user.password = hash;
  })

  return User;
};