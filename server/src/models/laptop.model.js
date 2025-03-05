import mongoose from 'mongoose'

const laptopSchema = new mongoose.Schema(
  {
    serialNo: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['AVAILABLE', 'ASSIGNED', 'FAULTY', 'RETURNED'],
      default: 'AVAILABLE',
    },
    allocatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Laptop = mongoose.model('Laptop', laptopSchema);

export default Laptop
