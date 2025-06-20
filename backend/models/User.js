const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true, index: true },
  name: String,
  email: { type: String, required: true, unique: true },
  payments: [{
    amount: Number,
    method: String,
    category: String,
    timestamp: Date,
  }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
notifications: [
  {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['group-invite', 'payment', 'reminder']
    },
    date: {
      type: Date,
      default: Date.now
    },
    read: {
      type: Boolean,
      default: false
    }
  }
],

});

module.exports = mongoose.model('User', userSchema);
