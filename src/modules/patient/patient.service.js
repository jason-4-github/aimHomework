const models = require('../../models');

const getPatientById = async (patientId) => {
  const PatientsModel = models.sequelize.models.Patients;
  const NationalitiesModel = models.sequelize.models.Nationalities;

  const result = await PatientsModel.findOne({
    raw: true,
    where: { patientsId: patientId },
    attributes: [
      ['patientsId', 'id'],
      'name',
      'birthday',
      'gender',
      [models.sequelize.col('Nationality.name'), 'nationality']
    ],
    include: { model: NationalitiesModel, attributes:[]},
  });

  return result;
};

module.exports = {
  getPatientById,
};