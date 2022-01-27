var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

dotenv.config();
var app = express();
const { handleError } = require('./src/utils/error');
var db = require('./src/models');

const testConnection = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

var indexRouter = require('./src/routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

app.use('/apis/doc', express.static(path.join(__dirname, 'docs')));
app.use('/apis/v1', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.log('Error: ', err.stack);
  handleError(err, res);
});


module.exports = app;
