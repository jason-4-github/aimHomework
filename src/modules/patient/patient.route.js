const express = require('express');
const { checkSchema } = require('express-validator');

const validate = require('../../utils/validate');
const getPatientController = require('./patient.controller');

const router = express.Router();

router.post('/',
  checkSchema({
    patientId: {
      in: ['body'],
      notEmpty: true,
      isNumeric: true,
    },
    systemDate: {
      in: ['body'],
      notEmpty: true,
      isDate: true,
    },
  }),
  validate,
  getPatientController.getPatient);

module.exports = router;
