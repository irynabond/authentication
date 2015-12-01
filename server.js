var mongoose = require('mongoose');
var express = require('express');
var app = express();
var countryRouter = require(__dirname + '/routes/countries');
var authRouter = require(__dirname + '/routes/auth_routes')
process.env.APP_SECRET = process.env.APP_SECRET || 'user'
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/countries');

app.use('/api', countryRouter);
app.use('/api', authRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
