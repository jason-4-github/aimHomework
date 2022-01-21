var express = require('express');
var router = express.Router();
var db = require('./../models');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  var { models } = db.sequelize;
    const users = await models.Patients.findAll();
    res.status(200).json(users);
});

module.exports = router;
