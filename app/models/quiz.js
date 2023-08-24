const Sequelize = require('sequelize');
const sequelizeClient = require('../database');

class Quiz extends Sequelize.Model {};

Quiz.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING
}, {
    tableName: 'quiz', // le nom de la table côté PSQL
    sequelize: sequelizeClient, // le client initialisé au préalable
    createdAt: false, // pour éviter d'avoir à s'occuper manuellement de la date de création(psql va s'en occuper pour nous)
    updatedAt: false
})

module.exports = Quiz;