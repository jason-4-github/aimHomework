const express = require('express');
const _ = require('lodash');

const { insertMockData } = require('../utils');
const feeRoute = require('../modules/fee/fee.route');
const patientRoute = require('../modules/patient/patient.route');

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

router.get('/createMockData', async (req, res, next) => {
  try {
    const insertResults = await insertMockData() || [];
    _.remove(insertResults, (e) => !e);

    res.status(200).json({
      insertedData: insertResults,
      message: insertResults.length === 0 ? 'Data Exist!' : 'Data Insert Success!'
    });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.use('/getFee', feeRoute);
router.use('/getPatient', patientRoute);

module.exports = router;
