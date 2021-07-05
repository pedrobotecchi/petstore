'use-strict'
const mongoose = require('mongoose');
mongoose.connect(process.env.DBHOST);

const dogs = new mongoose.Schema({
  name: { type: String, required: true },
  breed: String,
  furr: String,
  uid_client: String,
  size: String,
  deleted: Boolean
}, { collection: 'dogs' }
)

module.exports = { Mongoose: mongoose, Dogs: dogs }
