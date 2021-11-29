//var createError = require('http-errors');

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var dotenv = require("dotenv");

var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/authentication');
var productRouter = require('./routes/product');
var shoppingCartRouter = require('./routes/shoppingCart');
var orderRouter = require('./routes/order');
var stripeRouter = require('./routes/stripe');
var App = require('./frontend/src/App.js');
var cors = require("cors");

var app = express();

dotenv.config();

mongoose.connect("mongodb+srv://RebeccaAbraham21:reb21@cluster0.8kl6a.mongodb.net/shop?retryWrites=true&w=majority").then(()=>console.log("Database Connection Successful!!")
).catch((err)=>{console.log(err);
});

//var cookieParser = require('cookie-parser');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/authentication', authRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/shoppingCart', shoppingCartRouter);
app.use('/orders', orderRouter);
app.use('/checkout/pay', stripeRouter);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.get("/shop",function(req,res){
  console.log("shop website testing");
})

app.get("/checkout/pay",function(req,res){
  console.render(App);
})

app.listen(3000, function(req,resp){
  console.log("Server Running");
});

module.exports = app;

