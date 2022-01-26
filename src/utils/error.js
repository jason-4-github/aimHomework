const httpStatus = require('http-status');

class GeneralError extends Error {
  constructor (statusCode, message) {
    super();
    this.statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    this.message = message || 'unknown error';
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    statusCode,
    message
  });
};

module.exports = {
  GeneralError,
  handleError
};
