var createError = require('http-errors');
var express = require('express');
var path = require('path');
// cookies
var cookieParser = require('cookie-parser');
// 日志
var logger = require('morgan');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");
const session = require("express-session");
const RedisStore = require('connect-redis')(session);
const writeStream = require("./logs/logs")

var app = express();

// view engine setup

// app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'jade');
//设置后台日志
const ENV = process.env.NODE_ENV
// 正式环境
if(ENV !== "production"){
  app.use(logger('combined',{
    stream:writeStream
  }));
  // 测试黄精
}else{
  app.use(logger('dev',{
    stream:writeStream
  }));
}
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const redisClient = require("./db/redis")
const sessionStore = new RedisStore({
  client:redisClient
})
app.use(
  session({
    secret:"waJA12Sasd",//类似密匙
    cookie:{
      path:"/",      // 默认
      httpOnly:true, // 默认
      maxAge:24 * 60 * 60 * 1000
    // expires:24 * 60 * 60 * 1000
    },
    store:sessionStore
}))
// app.use(express.static(path.join(__dirname,"public")));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use("/api/blog",blogRouter);
app.use("/api/user",userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'mac' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
