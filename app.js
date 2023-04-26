let createError = require('http-errors');
let express = require('express');
const mongoose = require('mongoose');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
require('dotenv').config();

const compression = require('compression');
const helmet = require('helmet');
// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require('express-rate-limit');

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000,
});

const indexRouter = require('./routes/index');
const catalogueRouter = require('./routes/catalogue');

let app = express();
const mongodbUrl = process.env.MONGODB_URL;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(limiter);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net'],
    },
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/catalogue', catalogueRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(mongodbUrl);
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
