const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    ref: 'User',
  },
  refranceNumber: {
    type: String,
    required: true, 
    unique: true, 
  },
  pic: {
    type: String,
    required: false, // Adjust based on your requirements
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
