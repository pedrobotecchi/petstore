'use-strict'
const mongoose = require('mongoose');
mongoose.connect(process.env.DBHOST);

const sales = new mongoose.Schema({
  amount: { type: String, required: true },
  uid_client: { type: String, required: true },
  uid_employee: { type: String, required: true },
  saleDt: Date,
  deleted: Boolean
}, { collection: 'sales' }
)

module.exports = { Mongoose: mongoose, Sales: sales }
