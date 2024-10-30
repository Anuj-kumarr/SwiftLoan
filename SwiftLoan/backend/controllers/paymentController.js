const asyncHandler = require("express-async-handler");
const Loan  = require("../model/loanModel");
const User = require("../model/UserModel");
const Payment = require("../model/PaymentModel");

const createPayment = asyncHandler(async (req, res) => {
    const {refranceNumber, pic } = req.body;
    console.log(refranceNumber)
    const userId = req.params.id;
  
 
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      res.status(404); // Use 404 for not found
      throw new Error("No user found");
    }
  
    const paymentCheck = await Payment.findOne({ refranceNumber });
    if (paymentCheck) {
      res.status(400);
      throw new Error("Payment already exists with this reference number");
    }
  
    const newPayment = await Payment.create({
      userId: userDetails._id,
      refranceNumber: refranceNumber,
      pic: pic,
    });

    if (newPayment) {
      res.status(201).json({ newPayment });
    } else {
      res.status(500); 
      throw new Error("Error creating payment");
    }
  });

  const getPaymentDetails = asyncHandler(async (req, res) => {
    const refranceNumber = req.params.id;

    const paymentCheck = await Payment.findOne({ refranceNumber });
  
    if (paymentCheck) {
      res.status(200).json({
        payment: paymentCheck, 
      });
    } else {
      res.status(404); 
      throw new Error("Payment not found");
    }
  });
   
  const getDetails = asyncHandler(async (req, res) => {
    
    const payments = await Payment.find().sort({ createdAt: -1 });
  
    if (payments.length > 0) {
      res.status(200).json({
        payments, 
      });
    } else {
      res.status(404); 
      throw new Error("No payments found");
    }
  });
  
  const deletePayment = asyncHandler(async (req, res) => {
    const refranceNumber = req.params.id;
  
   
    const paymentCheck = await Payment.findOne({ refranceNumber });
  
    if (paymentCheck) {
      await Payment.deleteOne({ refranceNumber });
      res.status(200).json({ message: "Payment successfully deleted" });
    } else {
      res.status(404);
      throw new Error("No payment found");
    }
  });
  
 




module.exports = {createPayment ,getPaymentDetails, getDetails , deletePayment};