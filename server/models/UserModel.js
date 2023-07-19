import mongoose from 'mongoose';
import pkg from 'validator';
const { isEmail } = pkg;

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
