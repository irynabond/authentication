var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');

process.env.MONGOLAB_URI = 'mongodb://localhost/countries';

require(__dirname + '/../server');
var Country = require(__dirname + '/../models/country');

describe('country routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should add a new country', function(done) {
    var country = {name: 'Austria'};
    chai.request('localhost:3000')
      .post('/api/countries')
      .send(country)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Austria');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should not add country if duration of stay more 365 days', function(done) {
    var country = {name: 'Austria', durationDays: 666};
    chai.request('localhost:3000')
      .post('/api/country')
      .send(country)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('server error');
        expect(res.body).to.not.have.property('_id');
        done();
      });
  });

  it('should not add country without name', function(done) {
    var country = {description: 'beautiful'};
    chai.request('localhost:3000')
      .post('/api/country')
      .send(country)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('server error');
        expect(res.body).to.not.have.property('_id');
        done();
      });
  });

  it('should get list of countries', function(done) {
    chai.request('localhost:3000')
      .get('/api/country')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
});