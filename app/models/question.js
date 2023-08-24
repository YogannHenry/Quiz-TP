const Sequelize = require('sequelize');
const sequelizeClient = require('../database');


class Question extends Sequelize.Model {};

Question.init({
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    anecdote: {
        type: Sequelize.STRING,
        allowNull: true
    },
    wiki: {
        type: Sequelize.STRING,
        allowNull: true // on autorise la valeur à être null : 
    }
}, {
    tableName: 'question', // le nom de la table côté PSQL
    sequelize: sequelizeClient,  // le client initialisé au préalable
    createdAt: false, // pour éviter d'avoir à s'occuper manuellement de la date de création(psql va s'en occuper pour nous)
    updatedAt: false
})

module.exports = Question;