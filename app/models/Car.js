const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  milage: { type: Number, required: true },
  type: { type: String },
  color: { type: String },
  doors: { type: Number },
  seat_number: { type: Number },
  outer_condition: { type: String },
  inner_condition: { type: String },
  description: { type: String },
  images: [{ type: String }],  // Changed from single image to array of images
  location: { type: String, required: true },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Car', carSchema);