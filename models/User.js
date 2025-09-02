import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  mail: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  hashed_password: { type: String, required: true },
   profile_picture: {
    type: String,
  },
  // admin: { type: Boolean, default: false },
  phone_num: { type: String,required: true }

});

let User;
try {
  User = mongoose.model('User');
} catch {
  User = mongoose.model('User', userSchema);
}

export default User;