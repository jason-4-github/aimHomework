const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  var Fee = sequelize.define('Fee', {
    feeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fee: DataTypes.INTEGER,
    ageStart: DataTypes.INTEGER,
    ageEnd: DataTypes.INTEGER,
  });

  return Fee;
};