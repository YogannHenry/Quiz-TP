// on récupère le module sequelize
// ce qui va nous permettre de parler avec sequelize dans ses formats
const Sequelize = require('sequelize');

// l'instance qui nous permet de communiquer avec la BDD
const sequelizeClient = require('../database');


// pour configurer notre classe on va faire hériter notre classe level du modèle de sequelize
class Level extends Sequelize.Model {};

// maintenant que Level a hérite de sequelize, on va la configurer
Level.init({
        // la configuration d'un modèle se fait en 2 parties : 
        // 1 : la spécification des propriétés
        name: {
            type: Sequelize.STRING,// on a besoin de spécifier le type de chaque propriété, pour se faire, on utilise "Sequelize" récupéré en debut de fichier, qui possède un typage, en faisant cela, on rajoute tous les check concernant les types dans notre modèle
            allowNull: false, // on interdit le fait que le champ name soit null
        },
    },
    // 2 : le lien avec la BDD 
    {
        tableName: 'level', // le nom de la table côté PSQL
        sequelize: sequelizeClient,  // le client initialisé au préalable
        createdAt: false, // pour éviter d'avoir à s'occuper manuellement de la date de création(psql va s'en occuper pour nous)
        updatedAt: false
    }
)

module.exports = Level;