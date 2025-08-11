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
  new: { type: Boolean, default: false },
  description: { type: String },
  images: [{ type: String, required: true }],
  date: { type: Date, default: Date.now }
});

let Laptop;
try {
  Laptop = mongoose.model('Laptop');
} catch {
  Laptop = mongoose.model('Laptop', laptopSchema);
}

export default Laptop;