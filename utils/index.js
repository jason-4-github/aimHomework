const _ = require('lodash');

const models = require('../models');
const mockData = require('../data/mockData.json');

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

const firstYearOfTaiwan = 1911;

const birthdayToDateTime = (str) => {
  return `${parseInt(str.substr(0, 3), 10) + firstYearOfTaiwan}-${str.substr(3, 2)}-${str.substr(5, 2)}`;
};

module.exports = {
  insertMockData,
  firstYearOfTaiwan,
  birthdayToDateTime,
};
