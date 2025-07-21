const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  onModel: {
    type: String,
    required: true,
    enum: ['Car', 'Laptop', 'Book', 'Apartment']
  }
});

let Message;
try {
  Message = mongoose.model('Message');
} catch {
  Message = mongoose.model('Message', messageSchema);
}

export default Message;