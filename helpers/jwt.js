'use-strict'
const expressJwt = require('express-jwt');
const config = require('../config.json');
const jwtoken = require('jsonwebtoken')

module.exports = jwt

function jwt () {
  const { secret } = config

  if (process.env.NODE_ENV === 'test') {
    token = jwtoken.sign({ sub: 'adminToken' }, config.secret);
    process.env.API_TOKEN = token;
  }

  return expressJwt({ secret, algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      '/login/authenticate'
    ]
  })
}
