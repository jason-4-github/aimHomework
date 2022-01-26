const moment = require('moment');

const getFeeService = require('../fee/fee.service');
const getPatientService = require('./patient.service');
const { birthdayToDateTime } = require('../../utils');
const { genderTranslate } = require('../../utils/constants');

const getPatient = async (req, res, next) => {
  const { patientId, systemDate } = req.body;

  try {
    const patient = await getPatientService.getPatientById(patientId);
    let feeResult = {};

    if(patient !== null) {
      const birthdayTransfer = birthdayToDateTime(patient.birthday || '');
      const age = moment(systemDate).diff(moment(birthdayTransfer), 'years');
      const daysDiff = moment(systemDate).diff(moment(birthdayTransfer), 'days');
      patient.age = age;
      patient.gender = genderTranslate[patient.gender] || '';

      if(daysDiff >= 0 && age < 1000) {
        feeResult = await getFeeService.getFeeByAge(age);
        res.status(200).json({
          patient,
          amount: feeResult.fee,
        });
      } else res.status(400).json({ message: 'Time Error!' });
    }
  } catch (e) {
    console.log('aa');
    res.status(400).json({ message: e });
  }
};

module.exports = {
  getPatient,
};
