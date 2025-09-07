const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mail: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  hashed_password: { type: String, required: true },
  profile_image: { type: String },
  admin: { type: Boolean, default: false },
  phone_num: { type: String }
});

module.exports = mongoose.model('User', userSchema);