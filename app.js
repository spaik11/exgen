const createError = require('http-errors');
const express = require('express');
//allows us to use path.join to set up views and static files
const path = require('path');
//allows us to set cookies on client
const cookieParser = require('cookie-parser');
//allows us to see what http method was used, status, and path
const logger = require('morgan');
//allows us to use routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//starts express by calling the function
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(logger('dev'));
//turns input info into json
app.use(express.json());
//handles encoded input data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//connects static assets to express
app.use(express.static(path.join(__dirname, 'public')));

//define our parent route and note which folder to use
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //don't confuse this res.locals with the one you will create
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
