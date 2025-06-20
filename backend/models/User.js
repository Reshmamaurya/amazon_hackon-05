const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: { type: String, required: true, unique: true, index: true },
  name: String,
  email: { type: String, required: true, unique: true },
  
  payments: [{
    amount: Number,
    method: String,
    category: String,
    timestamp: Date,
  }],

  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],

  notifications: [{
    message: { type: String, required: true },
    type: { type: String, required: true, enum: ['group-invite', 'payment', 'reminder'] },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
  }],

  cart: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }]
});

module.exports = mongoose.model('User', userSchema);
