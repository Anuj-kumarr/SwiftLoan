const express = require("express");
const {
  createPayment,getPaymentDetails, getDetails, deletePayment
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/:id").post(protect, createPayment);
router.get("/getDetails", protect , getDetails);
router.post("/getDetails/:id", protect, getPaymentDetails); 
router.delete("/deletePayment/:id", protect, deletePayment);  // Correct the delete route with :id

module.exports = router;