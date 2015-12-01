var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  var token = req.headers.token || (req.body)? req.body.token : '';  
  if (!token) {
    console.log('no token');
    return res.status(401).json({msg: 'Error! Token is not received'});
  }

  eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'Error with decoding'});
    }

    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'User is not found'});
      }

      if (!user) {
        console.log(err);
        return res.status(401).json({msg: 'User is not found'});

      }
      req.user = user;
      next();
    });
  });
};
