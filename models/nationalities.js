const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  var Nationalities = sequelize.define('Nationalities', {
    nationalityId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
  });

  return Nationalities;
};