const express = require('express');
const { checkSchema } = require('express-validator');

const validate = require('../../utils/validate');
const getPatientController = require('./patient.controller');

const router = express.Router();

/**
   * @api {POST} /getPatient Get Patient Info And Amount
   * @apiVersion 0.0.1
   * @apiName getPatient
   * @apiGroup Patient
   * @apiPermission none
   *
   * @apiDescription 列出該病患個人資料與對應的醫藥費
   * @apiHeader {String} Content-Type               type of response
   * @apiHeaderExample {json} Header-Example:
   * {
   *   "Content-Type": "application/json"
   * }
   *
   * @apiParam (body)  {Int} patientId               病患ID
   * @apiParam (body)  {String} systemDate           系統時間
   *
   * @apiExample Example usage:
   * /getPatient
   *
   * @apiSuccess {Object}   patient                  病患個人資料
   * @apiSuccess {Int}      id                       病患ID
   * @apiSuccess {String}   name                     病患名字
   * @apiSuccess {String}   birthday                 病患生日
   * @apiSuccess {String}   gendar                   病患性別
   * @apiSuccess {String}   nationality              病患國籍
   * @apiSuccess {Int}      age                      病患年齡
   * @apiSuccess {Int}      amount                   對應的醫藥費
   *
   *
   * @apiSuccessExample Success-Response (example):
   * HTTP/1.1 200 OK
   *
   * {
   *   "patient": {
   *     "id": 3,
   *     "name": "李小美",
   *     "birthday": "1000801",
   *     "gender": "女",
   *     "nationality": "台灣",
   *     "age": 120
   *   },
   *   "amount": 0
   * }
   *
   *
   * @apiUse Error400
   * @apiUse Error404
   * @apiUse Error422
   *
   * @apiSampleRequest off
   *
*/

router.post('/',
  checkSchema({
    patientId: {
      in: ['body'],
      notEmpty: true,
      isNumeric: true,
    },
    systemDate: {
      in: ['body'],
      notEmpty: true,
      isDate: true,
    },
  }),
  validate,
  getPatientController.getPatient);

module.exports = router;
