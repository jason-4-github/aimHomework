const _ = require('lodash');

const models = require('../models');
const { firstYearOfTaiwan } = require('./constants');

const insertMockData = async (mockData) => {
  const insertDataActions = [];
  Object.keys(mockData).forEach((keyName) => {
    const Model = models.sequelize.models[_.upperFirst(keyName)];

    _.forEach(mockData[keyName], async (obj) => {
      insertDataActions.push(
        Model
          .findOrCreate({ where: obj })
          .then(([ results, isCreate ]) => {
            if(isCreate) return results;

            return isCreate;
          })
      );
    });
  });

  return Promise.all(insertDataActions);
};

const birthdayToDateTime = (str) => {
  return `${parseInt(str.substr(0, 3), 10) + firstYearOfTaiwan}-${str.substr(3, 2)}-${str.substr(5, 2)}`;
};

module.exports = {
  insertMockData,
  birthdayToDateTime,
};
