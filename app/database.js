
const { Sequelize } = require('sequelize');

// on configure le client qui va se connecter avec postgresql
const sequelizeClient = new Sequelize(process.env.PG_URL) // Example for postgres



// on exporte le module client, afin que le reste de notre code puisse le require afin de faire des requêtes SQL
module.exports = sequelizeClient;