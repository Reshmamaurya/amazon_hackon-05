const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: Number,
  method: String,
  category: String,
  timestamp: Date,
});

const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: String,
  payments: [paymentSchema],
});

module.exports = mongoose.model('User', userSchema);
