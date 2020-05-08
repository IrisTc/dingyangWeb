var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoConf = require('./config/mongo')
mongoConf.connect()
require('./config/util')


var articlesRouter = require('./routes/article')
var videosRouter = require('./routes/video')
var booksRouter = require('./routes/book')
var countsRouter = require('./routes/count')

var hyArticlesRouter = require('./routes/huayin/article')
var hyOtherRouter = require('./routes/huayin/other')
var usersRouter = require('./routes/user')

var app = express();
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
  });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/article', articlesRouter)
app.use('/article/add', articlesRouter)
app.use('/video', videosRouter)
app.use('/book', booksRouter)
app.use('/count', countsRouter)

app.use('/huayin/article', hyArticlesRouter)
app.use('/huayin/article/add', hyArticlesRouter)
app.use('/huayin/other', hyOtherRouter)
app.use('/huayin/other/change', hyOtherRouter)
app.use('/huayin/login', usersRouter)


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
