const Sequelize = require('sequelize');

const sequelize = require('../utilities/database.utils');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    roleId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})
module.exports = User;