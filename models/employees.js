
const { Sequelize, DataTypes, Model } = require("sequelize")
const sequelize = require("../config/dbconnection")

//MODELLO EMPLOYEE
class Employees extends Model { }
Employees.init({
    id: {
        type: DataTypes.INTEGER(2),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    codice :{
        type: DataTypes.INTEGER(5),
        allowNull: false
        
    },

    salt :{
        type: DataTypes.CHAR(200),
        allowNull:false

    },

    password: {
        type: DataTypes.CHAR(200),
        allowNull:false
    },

    


},{sequelize,
    modelName: "Employee"})

    module.exports = Employees
