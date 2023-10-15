
const { Sequelize, DataTypes, Model } = require("sequelize")
const sequelize = require("../config/dbconnection")
const User = require("./user")

//MODELLO CARTA
class Card extends Model { }
Card.init({
    id: {
        type: DataTypes.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    idUtente: {
        type: DataTypes.INTEGER(4),
        allowNull: false
    },

    codice: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },

    punti: {
        type: DataTypes.INTEGER(10),
        allowNull: true
    },

    


},

    {
        sequelize,
        modelName: "Card"
    }),

    //ASSOCIAZIONE CON CLIENTI  
    Card.belongsTo(User,{foreignKey:"idUtente",as:"proprietario"})
    module.exports = Card