const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  processor: { type: String, required: true },
  ram: { type: String, required: true },
  storage: { type: String, required: true },
  gpu: { type: String },
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Laptop', laptopSchema);