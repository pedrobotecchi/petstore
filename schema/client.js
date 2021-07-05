'use-strict'
const mongoose = require('mongoose');
mongoose.connect(process.env.DBHOST);

const clients = new mongoose.Schema({
  cpf: { type: String, required: true },
  name: String,
  phone: String,
  address: String,
  deleted: Boolean
}, { collection: 'clients' }
)

module.exports = { Mongoose: mongoose, Clients: clients }
