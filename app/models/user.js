
const Sequelize = require('sequelize');
const sequelizeClient = require('../database');

class User extends Sequelize.Model {};

User.init({
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'user', // le nom de la table côté PSQL
    sequelize: sequelizeClient,  // le client initialisé au préalable
    createdAt: false, // pour éviter d'avoir à s'occuper manuellement de la date de création(psql va s'en occuper pour nous)
    updatedAt: false
})

module.exports = User;