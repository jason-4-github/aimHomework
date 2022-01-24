const express = require('express');
const { checkSchema } = require('express-validator');

const { insertMockData } = require('../utils');
const validate = require('../utils/validate');
const models = require('../models');
const getFeeRoute = require('../modules/getFee/getFee.route');
const getPatientRoute = require('../modules/getPatient/getPatient.route');

const router = express.Router();

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

router.get('/', async (req, res, next) => {
  insertMockData();
  res.status(200).json('123');
});

router.use('/getFee', getFeeRoute);
router.use('/getPatient', getPatientRoute);

module.exports = router;
