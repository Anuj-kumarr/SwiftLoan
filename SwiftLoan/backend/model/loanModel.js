const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const PaymentSchema = mongoose.Schema({
  Amt_recived: { type: String, required: true },
  
  Status: {
    type: String,
    enum: ['approved', 'not approved'], 
    default: 'not approved', 
  },

  Due_date: { type: Date, required: true }, 
});

const loanSchema = mongoose.Schema(
  {
    UserId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "User" 
      }, 
    loan_amt: { type: Number, default: 0 },
    PayedAmt: { type: Number, default: 0 },
    loanGiven:{type: Boolean , default:false},
    
    Amt_chart: [PaymentSchema], 
  },
  { timestamps: true } 
);

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
