const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const chalk = require('chalk');

const app = require('../../app');

const agent = request.agent(app);
const url = '/apis/v1/getPatient';

describe(chalk.bgMagenta('===> [getPatient]'), () => {

  describe(`[POST] ${url}`, () => {
    it('patientId is not exist in db will response empty patient.', (done) => {
      const patientId = 8;
      const systemDate = '2021-12-01';

      agent
        .post(`${url}`)
        .send({ patientId, systemDate })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK)
        .end((err, res) => {
          if(err) throw err;

          const result = res.body;
          expect(result).to.be.an('object');
          expect(result).to.have.property('patient');
          expect(result).to.have.property('amount');
          expect(result).to.deep.equal({
            "patient": {},
            "amount": 0
          });

          done();
        });
    });

    it('Just put one parameter in body will response 422 error.', (done) => {
      const patientId = 3;
      const systemDate = '2021-12-01';

      agent
        .post(`${url}`)
        .send({ patientId })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(httpStatus.UNPROCESSABLE_ENTITY)
        .end((err, res) => {
          if(err) throw err;

          const result = res.body;
          expect(result).exist;
          expect(result).to.be.an('object');
          expect(result).to.deep.equal({
            "statusCode": 422,
            "message": "Invalid value"
          });
        });

      agent
        .post(`${url}`)
        .send({ systemDate })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(httpStatus.UNPROCESSABLE_ENTITY)
        .end((err, res) => {
          if(err) throw err;

          const result = res.body;
          expect(result).exist;
          expect(result).to.be.an('object');
          expect(result).to.deep.equal({
            "statusCode": 422,
            "message": "Invalid value"
          });

          done();
        });
    });

    it('SystemDate bigger than patient\'s birthday exceed 999 year will response time error', (done) => {
      const patientId = 3;
      const systemDate = '3121-12-01';

      agent
        .post(`${url}`)
        .send({ patientId, systemDate })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(httpStatus.BAD_REQUEST)
        .end((err, res) => {
          if(err) throw err;

          const result = res.body;
          expect(result).exist;
          expect(result).to.be.an('object');
          expect(result).to.deep.equal({ message: 'Time Error!' });

          done();
        });
    });
  });
});
