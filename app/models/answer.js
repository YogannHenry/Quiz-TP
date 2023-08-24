
const Sequelize = require('sequelize');
const sequelizeClient = require('../database');


class Answer extends Sequelize.Model {};

Answer.init({
    description: {
        type: Sequelize.STRING,// on a besoin de spécifier le type de chaque propriété, pour se faire, on utilise "Sequelize" récupéré en debut de fichier, qui possède un typage, en faisant cela, on rajoute tous les check concernant les types dans notre modèle
        allowNull: false, // on interdit le fait que le champ name soit null
    },
}, {
    tableName: 'answer', // le nom de la table côté PSQL
    sequelize: sequelizeClient,  // le client initialisé au préalable
    createdAt: false, // pour éviter d'avoir à s'occuper manuellement de la date de création(psql va s'en occuper pour nous)
    updatedAt: false
})

module.exports = Answer;