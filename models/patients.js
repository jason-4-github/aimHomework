const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  var Patients = sequelize.define('Patients', {
    patientsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    gender: DataTypes.STRING,
    country: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
  });

  return Patients;
};