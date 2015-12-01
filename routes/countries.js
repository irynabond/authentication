var express = require('express');
var bodyParser = require('body-parser');
var Country = require(__dirname + '/../models/country');
var handleError = require(__dirname + '/../lib/handleServerError');

var countryRouter = module.exports =  exports = express.Router();

countryRouter.get('/country', function(req, res) {
  Country.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

countryRouter.post('/country', bodyParser.json(), function(req, res) {
  var newCountry = new Country(req.body);
  newCountry.save(function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

countryRouter.put('/country/:id', bodyParser.json(), function(req, res) {
  var countryData = req.body;
  delete countryData._id;
  Country.update({_id: req.params.id}, countryData, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success!'});
  });
});

countryRouter.delete('/country/:id', function(req, res) {
  Country.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success!'});
  });
});


