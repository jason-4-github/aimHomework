const express = require('express');
const { checkSchema } = require('express-validator');

const validate = require('../../utils/validate');
const getFeeController = require('./getFee.controller');
const router = express.Router();

router.get('/',
  checkSchema({
    birthday: {
      in: ['query'],
      notEmpty: true,
      isLength: {
        options: {
          min: 7,
          max: 7,
        }
      }
    },
    systemDate: {
      in: ['query'],
      notEmpty: true,
      isDate: true,
    },
  }),
  validate,
  getFeeController.getFee);

module.exports = router;
