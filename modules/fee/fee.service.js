const models = require('../../models');

const getFeeByAge = async (age) => {
  const FeeModel = models.sequelize.models.Fee;
  const result  = await FeeModel.findOne({
    raw: true,
    where: {
      ageStart: models.sequelize.where(
        models.sequelize.literal('ageStart'),
        '<=',
        age
      ),
      ageEnd: models.sequelize.where(
        models.sequelize.literal('ageEnd'),
        '>=',
        age
      ),
    },
  });

  return result;
};

module.exports = {
  getFeeByAge,
};