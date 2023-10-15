const { Sequelize, DataTypes, Model } = require("sequelize")
const sequelize = require("../config/dbconnection")


//MODELLO UTENTI
class User extends Model { }
User.init({
    id: {
        type: DataTypes.INTEGER(2),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: DataTypes.CHAR(10),
        allowNull: false
    },

    cognome: {
        type: DataTypes.CHAR(10),
        allowNull: false
    },

    email: {
        type: DataTypes.CHAR(100),
        allowNull: false

    },

    salt: {
        type: DataTypes.CHAR(200),
        allowNull: false

    },

    password: {
        type: DataTypes.CHAR(200),
        allowNull: false
    },

},{
    sequelize,
    modelName: "User"
})

module.exports = User