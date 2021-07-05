'use-strict'
require('dotenv').config({ path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.testing' })
const mongoose = require('mongoose');

if(process.env.NODE_ENV === 'test') {
  mongoose.connect(process.env.DBHost);
  let db = mongoose.connection;
  
  db.dropDatabase();
}


const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// Routers
const indexRouter = require('./routes/index')
const employeesRouter = require('./routes/employees')
const clientsRouter = require('./routes/clients')
const loginRouter = require('./routes/login')
const dogsRouter = require('./routes/dogs')
const productsRouter = require('./routes/products')
const salesRouter = require('./routes/sales')

// Authentication
const jwt = require('./helpers/jwt')

const app = express()

console.log('Running on port : 9000')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// use JWT auth to secure the api
app.use(jwt())

app.use('/', indexRouter)
app.use('/employees', employeesRouter)
app.use('/clients', clientsRouter)
app.use('/login', loginRouter)
app.use('/dogs', dogsRouter)
app.use('/products', productsRouter)
app.use('/sales', salesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
