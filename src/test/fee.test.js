const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const chalk = require('chalk');

const app = require('../../app');

const agent = request.agent(app);
const url = '/apis/v1/getFee';

describe(chalk.bgMagenta('===> [getFee]'), () => {

  describe(`[GET] ${url}`, () => {
    it('birthday < systemDate', (done) => {
      const birthday = '1101201';
      const systemDate = '2021-12-01';

      agent
        .get(`${url}?birthday=${birthday}&systemDate=${systemDate}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK)
        .end((err, res) => {
          if(err) throw err;

          const result = res.body;
          expect(result).to.be.an('object');
          expect(result).to.have.property('amount');

          done();
        });
    });

    it('birthday = systemDate', (done) => {
      const birthday = '1100101';
      const systemDate = '2021-12-01';

      agent
        .get(`${url}?birthday=${birthday}&systemDate=${systemDate}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK)
        .end((err, res) => {
          if(err) throw err;

          const result = res.body;
          expect(result).to.be.an('object');
          expect(result).to.have.property('amount');

          done();
        });
    });

    it('birthday > systemDate response time error.', (done) => {
      const birthday = '1220101';
      const systemDate = '2021-12-01';

      agent
        .get(`${url}?birthday=${birthday}&systemDate=${systemDate}`)
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

    it('Just put one parameter in query will reponse 422 error.', (done) => {
      const birthday = '1220101';

      agent
        .get(`${url}?birthday=${birthday}`)
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

    it('SystemDate bigger than birthday exceed 999 year will response time error', (done) => {
      const birthday = '1101201';
      const systemDate = '3121-12-01';

      agent
        .get(`${url}?birthday=${birthday}&systemDate=${systemDate}`)
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
