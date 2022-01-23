var _ = require('lodash');
var models = require('../models');
var mockData = require('../data/mockData.json');

const insertMockData = () => {
  Object.keys(mockData).forEach((keyName) => {
    const Model = models.sequelize.models[_.upperFirst(keyName)];
    _.forEach(mockData[keyName], async (obj) => {
      try {
        await Model.create(obj);
      } catch (e) {
        console.log(`Insert ${keyName} Error: `, e);
      }
    });
  });
};

module.exports = {
  insertMockData,
};
