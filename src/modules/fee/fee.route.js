const express = require('express');
const { checkSchema } = require('express-validator');

const validate = require('../../utils/validate');
const getFeeController = require('./fee.controller');
const router = express.Router();

/**
   * @api {GET} /getFee?birthday=:birthday&systemDate=:systemDate Get Fee
   * @apiVersion 0.0.1
   * @apiName getFee
   * @apiGroup Fee
   * @apiPermission none
   *
   * @apiDescription 列出該年齡相對應的醫藥費
   * @apiHeader {String} Content-Type               type of response
   * @apiHeaderExample {json} Header-Example:
   * {
   *   "Content-Type": "application/json"
   * }
   *
   * @apiParam none
   *
   * @apiExample Example usage:
   * /getFee?birthday=0810221&systemDate=2022-01-01
   *
   * @apiSuccess {Int}   amount                   費用
   *
   * @apiSuccessExample Success-Response (example):
   * HTTP/1.1 200 OK
   *
   *  {
   *     "amount": 150,
   *  }
   *
   *
   * @apiUse Error400
   * @apiUse Error404
   * @apiUse Error422
   *
   * @apiSampleRequest http://localhost:3001/apis/v1/getFee?birthday=0810221&systemDate=2022-01-01
   *
*/

router.get('/',
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
  getFeeController.getFee);

module.exports = router;
