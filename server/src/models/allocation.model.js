import mongoose from 'mongoose'

const allocationSchema = new mongoose.Schema(
  {
    laptop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Laptop',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    allocatedAt: {
      type: Date,
      default: Date.now,
    },
    returnedAt: {
      type: Date,
    },
    returnStatus: {
      type: String,
      enum: ['PENDING', 'RETURNED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);

const Allocation = mongoose.model('Allocation', allocationSchema);
export default Allocation