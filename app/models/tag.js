
const Sequelize = require('sequelize');
const sequelizeClient = require('../database');

class Tag extends Sequelize.Model {};

Tag.init({
    name: {
        allowNull: false,
        type: Sequelize.STRING
    }
}, {
    tableName: 'tag', // le nom de la table côté PSQL
    sequelize: sequelizeClient,  // le client initialisé au préalable
    createdAt: false, // pour éviter d'avoir à s'occuper manuellement de la date de création(psql va s'en occuper pour nous)
    updatedAt: false
})

module.exports = Tag;