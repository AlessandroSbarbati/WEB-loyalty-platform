
const { Sequelize, DataTypes, Model } = require("sequelize")
const sequelize = require("../config/dbconnection")



//MODELLO GIFT
class Gift extends Model { }
Gift.init({
    id: {
        type: DataTypes.INTEGER(2),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

   
     
    nomeRegalo: {
        type: DataTypes.CHAR(100),
        allowNull: false

    },


    descrizione: {
        type: DataTypes.CHAR(200),
        allowNull: true
    },


    numeroPunti:{
        type: DataTypes.INTEGER(10),
        allowNull: true

    },

  

    
    
    

    

    

}
, {
    sequelize,
    modelName: "Gift"
})
    


module.exports = Gift