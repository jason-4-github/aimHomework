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
        .expect(httpStatus.OK)
        .end((err, res) => {
          if(err) throw err;

          const result = res.body;
          expect(result).to.be.an('object');
          expect(result).to.have.property('amount');
          
          done();
        })
    });

    it('birthday = systemDate', (done) => {
      const birthday = '1100101';
      const systemDate = '2021-12-01';

      agent
        .get(`${url}?birthday=${birthday}&systemDate=${systemDate}`)
        .expect(httpStatus.OK)
        .end((err, res) => {
          if(err) throw err;

          const result = res.body;
          expect(result).to.be.an('object');
          expect(result).to.have.property('amount');

          done();
        })
    });

    it('birthday > systemDate', (done) => {
      const birthday = '1220101';
      const systemDate = '2021-12-01';

      agent
        .get(`${url}?birthday=${birthday}&systemDate=${systemDate}`)
        .expect(httpStatus[400])
        .end((err, res) => {

          expect(err).exist;
          expect(err).to.have.property('actual');
          expect(err.actual).to.be.an('object');
          expect(err.actual).to.deep.equal({ message: 'Params Error' });

          done();
        })
    });
  });
});
