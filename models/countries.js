const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  var Countries = sequelize.define('Countries', {
    countriesId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
  });

  return Countries;
};