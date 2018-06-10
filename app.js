var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var crowd2Router = require('./routes/crowd-2');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/crowd-2', crowd2Router);
//jquery
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
//bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 
//jquery-ui-dist
app.use('/js', express.static(__dirname + '/node_modules/jquery-ui-dist')); 
app.use('/css', express.static(__dirname + '/node_modules/jquery-ui-dist')); 
//font-awesome
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css')); 
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts')); 
//jexcel
app.use('/js', express.static(__dirname + '/node_modules/jexcel/dist/js')); 
app.use('/css', express.static(__dirname + '/node_modules/jexcel/dist/css')); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
