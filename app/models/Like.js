const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel', required: true },
  onModel: {
    type: String,
    required: true,
    enum: ['Car', 'Laptop', 'Book', 'Apartment']
  }
});

module.exports = mongoose.model('Like', likeSchema);