'use-strict'
const mongoose = require('mongoose');
mongoose.connect(process.env.DBHOST);

const products = new mongoose.Schema({
  price: { type: Number, required: true },
  name: { type: String, required: true },
  description: String,
  deleted: Boolean
}, { collection: 'products' }
)

module.exports = { Mongoose: mongoose, Products: products }
