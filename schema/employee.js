'use-strict'
const mongoose = require('mongoose');
mongoose.connect(process.env.DBHOST);

const employees = new mongoose.Schema({
  user: { type: String, required: true },
  name: String,
  password: String,
  lastLogin: Date,
  deleted: Boolean
}, { collection: 'employees' }
)

module.exports = { Mongoose: mongoose, Employees: employees }
