var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleServerError');
var basicHttp = require(__dirname + '/../lib/basic_auth');
var User = require(__dirname + '/../models/user');

var authRouter = module.exports = exports = express.Router();
authRouter.post('/signup', jsonParser, function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if (err) throw err;
    if (user) return res.json({msg: 'that\'s taken'});

    var user = new User();
    user.auth.basic.username = req.body.username;
    user.username = req.body.username;
    user.hashPassword(req.body.password);

    user.save(function(err, data) {
      if (err) return handleError(err, res);
      user.generateToken(function(err, token) {
        if (err) return handleError(err, res);
        res.json({token: token});
      });
    });
  });
});
authRouter.get('/signin', basicHttp, function(req, res) {
  if (!(req.auth.username && req.auth.password)) {
    console.log('no basic auth provided');
    return res.status(401).json({msg: 'Error! User is not found'});
  }

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('no basic auth provided');
      return res.status(401).json({msg: 'Error! User is not found'});
    }

    if (!user) {
      console.log('no basic auth provided');
      return res.status(401).json({msg: 'Error! User is not found'});
    }

    if (!user.checkPassword(req.auth.password)) {
     console.log('no basic auth provided');
     return res.status(401).json({msg: 'Error! User is not found'});
    }

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);
      res.json({token: token});
    });
  });
});
