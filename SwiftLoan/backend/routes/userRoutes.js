const express = require("express");
const {
  registerUser,
  authUser,getUser
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

console.log("request come to patientRoutes");

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/get/:id" ,protect , getUser);


module.exports = router;