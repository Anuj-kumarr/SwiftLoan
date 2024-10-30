const express = require("express");
const {
  createLoan,
  UpdateLoan,
  getDetails,
  getDetailsUser,
  DeleteLoan
} = require("../controllers/loanController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/:id").post(protect, createLoan);
router.get("/getDetails", protect, getDetails); 
router.post("/getDetails/:id", protect, getDetailsUser); 
router.put("/updateLoan/:id", protect, UpdateLoan);  // Use PUT for updating
router.delete("/deleteLoan/:id", protect, DeleteLoan);  // Correct the delete route with :id

module.exports = router;