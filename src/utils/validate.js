const { validationResult } = require('express-validator');
const httpStatus = require('http-status');

const { GeneralError } = require('./error');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const message = validationResult(req).errors[0].msg;
    throw new GeneralError(httpStatus.UNPROCESSABLE_ENTITY, message);
  }

  next();
};

module.exports = validate;
