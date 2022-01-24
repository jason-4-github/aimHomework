const moment = require('moment');

const models = require('../../models');
const getFeeService = require('../getFee/getFee.service');
const { birthdayToDateTime } = require('../../utils');

const getPatient = async (req, res, next) => {
  const { patientId, systemDate } = req.body;
  const PatientsModel = models.sequelize.models.Patients;
  const NationalitiesModel = models.sequelize.models.Nationalities;
  try {
    const result = await PatientsModel.findOne({
      raw: true,
      where: { patientsId: patientId },
      include: { model: NationalitiesModel },
    });
    if(result !== null) {
      const birthdayTransfer = birthdayToDateTime(result.birthday);
      const age = moment(systemDate).diff(moment(birthdayTransfer), 'years');
      const daysDiff = moment(systemDate).diff(moment(birthdayTransfer), 'days');
      let feeResult = {};

      if(daysDiff >= 0) feeResult = await getFeeService.getFeeByAge(age);
    }
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

module.exports = {
  getPatient,
};
