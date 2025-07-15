const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  images: [{ type: String, required: true }],
  room_count: { type: Number, required: true },
  bathroom_count: { type: Number, required: true },
  // level: { type: Number },
  space: { type: Number, required: true },
  inner_condition: { type: String },
  floor: { type: Number },
  furnished: { type: Boolean, default: false },
  sell: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

let Apartment;
try {
  Apartment = mongoose.model('Apartment');
} catch {
  Apartment = mongoose.model('Apartment', apartmentSchema);
}

export default Apartment;