const dbconfig = require('./databaseconfig')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbconfig.database, dbconfig.user, dbconfig.password, {
    host: dbconfig.host,
    dialect: dbconfig.dialect,
    operatorAliases : false,


    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,

    }

})

module.exports = sequelize;