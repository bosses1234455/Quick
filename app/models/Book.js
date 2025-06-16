const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  images: [{ type: String }], // Changed from single image to array
  state: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);