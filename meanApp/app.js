var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');


var config = require('./config/config');
var routes = require('./routes/index');
var users = require('./routes/users');



// Admin Routes
var admin = require('./routes/admin/admin');
var aUsers = require('./routes/admin/users');



var mongoose = require('mongoose');
var logger = require('winston');




function LogFolder(){
  var dir = './logs';
  var y = new Date();
  var param = [y.getFullYear(), y.getMonth(),y.getDate(), y.getHours()];
  var lastItem = null;
  param.forEach(function(item, e) {
    if(lastItem == param[e - 1]){
      dir+= "/"+item;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        lastItem = item;
      }
    }else{
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        lastItem = item;
      }
    }
  });

  return dir;
}

LogFolder();

var y = new Date();
var dir = "logs/"+y.getFullYear()+"/"+y.getMonth()+"/"+y.getDate()+"/"+ y.getHours()+"/";
logger.add(logger.transports.File, { filename: dir+'logs.log' });

app.use(cors(config.corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade');

app.use('/', routes);
app.use('/api/v1/client/users', users);
app.use('/api/v1/admin', admin);
app.use('/api/v1/admin/users', aUsers);


// Create the database connection
mongoose.connect('mongodb://'+config.DB_URL+':27017/'+config.DB_NAME);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  logger.log('info','Mongoose default connection open to ' + config.DB_NAME);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  logger.log('error','Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  logger.log('warn','Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    logger.log('info', 'Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});



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
