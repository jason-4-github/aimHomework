'use strict';

var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.js')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelDefiners = [
	require('./fee'),
  require('./nationality'),
  require('./patient'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
// console.log(db);
Object.keys(sequelize.models).forEach(modelName => {
  if (sequelize.models[modelName].associate) {
    sequelize.models[modelName].associate(sequelize.models);
  }
});
// sequelize.models.Nationalities.belongsTo(sequelize.models.Patients);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;