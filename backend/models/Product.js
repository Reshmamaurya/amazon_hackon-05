const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String },
  rating: { type: String },
  price: { type: String },
  description: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
