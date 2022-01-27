const express = require('express');
const _ = require('lodash');

const { insertMockData } = require('../utils');
const mockData = require('../data/mockData.json');

const feeRoute = require('../modules/fee/fee.route');
const patientRoute = require('../modules/patient/patient.route');

const router = express.Router();

/**
 * @apiDefine Error400
 * @apiVersion 0.0.1
 *
 * @apiError Bad_Request 參數的值異常
 *
 * @apiErrorExample  400Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "message": "Time Error!""
 *     }
 */

/**
 * @apiDefine Error404
 * @apiVersion 0.0.1
 *
 * @apiError Not_Found Api路徑錯誤
 *
 * @apiErrorExample  404Error-Response (example):
 *     HTTP/1.1 404 Not Found
 *     {
 *       "statusCode": 404,
 *       "message": "Not Found"
 *     }
 */

/**
 * @apiDefine Error422
 * @apiVersion 0.0.1
 *
 * @apiError validation_Error 參數異常
 *
 * @apiErrorExample  422Error-Response (example):
 *     HTTP/1.1 422 UNPROCESSABLE_ENTITY
 *     {
 *       "statusCode": 422,
 *       "message": "Invalid value"
 *     }
 */

router.post('/createMockData', async (req, res, next) => {
  try {
    const insertData = req.body.data;
    const insertResults = await insertMockData(insertData || mockData) || [];
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
