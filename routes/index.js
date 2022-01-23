var express = require('express');
var moment = require('moment');
const { checkSchema } = require('express-validator');

var { insertMockData } = require('../utils');
const validate = require('../utils/validate');
var models = require('../models');

var router = express.Router();
const firstYearOfTaiwan = 1911;

/**
 * @apiDefine Error404
 * @apiVersion 0.0.1
 *
 * @apiError Not_Found Get data by providing parameters, but parameters not existed. Or route is wrong
 *
 * @apiErrorExample  404Error-Response (example):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "statusCode": 404,
 *       "message": ""
 *     }
 */

/**
 * @apiDefine Error422
 * @apiVersion 0.0.1
 *
 * @apiError validation_Error Post data by providing parameters, but some of parameters are missed
 *
 * @apiErrorExample  422Error-Response (example):
 *     HTTP/1.1 422 UNPROCESSABLE_ENTITY
 *     {
 *       "statusCode": 422,
 *       "message": ""
 *     }
 */

/* GET users listing. */
router.get('/', async (req, res, next) => {
  insertMockData();
  res.status(200).json('123');
});

const birthdayToDateTime = (str) => {
  return `${parseInt(str.substr(0, 3), 10) + firstYearOfTaiwan}-${str.substr(3, 2)}-${str.substr(5, 2)}`;
};

router.get('/getFee',
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
 async (req, res, next) => {
  const { birthday, systemDate } = req.query;
  const birthdayTransfer = birthdayToDateTime(birthday);
  const age = moment(systemDate).diff(moment(birthdayTransfer), 'years');
  const daysDiff = moment(systemDate).diff(moment(birthdayTransfer), 'days');

  if(daysDiff < 0) {
    res.status(400).json({message: 'Params Error'});
  } else {
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

    res.status(200).json({ amount: result.fee });
  }
});

router.post('/getPatient', async (req, res, next) => {
  insertMockData();
  res.status(200).json('123');
});

module.exports = router;
