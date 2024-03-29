var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var engines = require('consolidate');

var indexRouter = require('./routes/index');
var tradeRouter = require('./routes/trade');

var app = express();

// view engine setup
app.engine('jade',engines.jade);
app.engine('ejs',engines.ejs);
app.set('view engine','jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(require('express-session')({
    secret: 'online store',
    cookie: {maxAge: 120000 },
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/trade', tradeRouter);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_online_store',{
    useMongoClient: true
});


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
