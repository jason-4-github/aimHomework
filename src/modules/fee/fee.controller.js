const moment = require('moment');

const { birthdayToDateTime } = require('../../utils');
const getFeeService = require('./fee.service');


const getFee = async (req, res, next) => {
  const { birthday, systemDate } = req.query;
  const birthdayTransfer = birthdayToDateTime(birthday);
  const age = moment(systemDate).diff(moment(birthdayTransfer), 'years');
  const daysDiff = moment(systemDate).diff(moment(birthdayTransfer), 'days');

  if(daysDiff >= 0 && age < 1000) {
    const fee = await getFeeService.getFeeByAge(age);
    res.status(200).json({ amount: fee.fee });
  } else {
    res.status(400).json({ message: 'Time Error!' });
  }
};

module.exports = {
  getFee,
};
