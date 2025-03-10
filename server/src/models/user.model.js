import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname: {
      type:String,
      required:true
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'FACILITATOR'],
      default: 'FACILITATOR',
    },
    laptopBorrowed:{
      type:Number,
      default: 0,
      max: 1,
    },
    laptops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Laptop',
      }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User
