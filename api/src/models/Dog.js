const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,    
    },
    image:{
      type: DataTypes.STRING,
    },      
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
     
    },
    min_height:{
      type: DataTypes.INTEGER,
      validate:{min: 1, max: 100},
      allowNull: false
    },
    max_height:{
      type: DataTypes.INTEGER,
      validate:{min: 1, max: 100},
      allowNull: false
    },
    min_weight:{
      type: DataTypes.INTEGER,
      validate:{min: 1, max: 100},
      allowNull: false
    },
    max_weight:{
      type: DataTypes.INTEGER,
      validate:{min: 1, max: 100},
      allowNull: false
    },
    min_lifeSpan: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 20 },
      allowNull: false,
    },
    max_lifeSpan: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 20 },
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
    },   

  },{timetamps: false});
};
