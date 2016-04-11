var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('express-jwt');

//Config Files
var config = require('./config/config');
//Create Log Folder and Initiate LogFile
var logFolder = require('./modules/logs').logFolder();

var Admin = require("./models/admin/admin.js").Admin;



app.use(jwt({ secret: config.secret}).unless({path: config.freeRoutes}));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.set('view engine', 'jade');

//Add Option for HTTP Request
app.use(cors(config.corsOptions));


//Connect to BDD
var mongooseModule = require('./modules/mongoose/module');
mongooseModule.connect();
mongooseModule.event();


// User Routes
var routes = require('./routes/index');
var user = require('./routes/user');


//Product Routes
var product = require('./routes/product');


// Admin Routes
var admin = require('./routes/admin/admin');
var aUser = require('./routes/admin/user');

//Routing
app.use('/', routes);
app.use('/api/v1/client/user', user);
app.use('/api/v1/admin', admin);
app.use('/api/v1/product', product);
app.use('/api/v1/admin/user', aUser);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});






module.exports = app;
