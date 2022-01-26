const express = require('express');
const _ = require('lodash');

const { insertMockData } = require('../utils');
const mockData = require('../data/mockData.json');

const feeRoute = require('../modules/fee/fee.route');
const patientRoute = require('../modules/patient/patient.route');

const router = express.Router();

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
