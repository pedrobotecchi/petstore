'use-strict'
const express = require('express')
const router = express.Router()
const userService = require('../api/user.service')

// routes
router.post('/authenticate', authenticate)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

function authenticate (req, res, next) {
  userService.authenticate(req.body)
    .then(user => res.json(user))
    .catch(next)
}

module.exports = router
