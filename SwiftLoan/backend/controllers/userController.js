const asyncHandler = require("express-async-handler");
const User = require("../model/UserModel");
const generateToken = require("../config/generateToken");
const  mongoose = require('mongoose');

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  console.log("request to reguister user")
  const { name, email, phNumber, sex, password, pic, address } = req.body;

  console.log(name, email);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  
  const user = await User.create({
    name,
    email,
    phNumber,
    sex,
    password,
    pic,
    address,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      sex: user.sex,
      pic: user.pic,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

// Authenticate a user and login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    
    const payload = {
      id: user.id,
    };
  

  
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      sex: user.sex,
      pic: user.pic,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUser = asyncHandler(async (req, res) => {
  console.log("Request comes to get user");

  const userId = req.params.id || req.body.userId;
  console.log("userId:", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("Invalid User ID");
  }

  const user = await User.findById(userId);
  console.log(user);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      sex: user.sex,
      pic: user.pic,
      address: user.address,
      loanTaken: user.loanTaken,
      loanId: user.loanId,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


module.exports = {
  registerUser,
  authUser,
  getUser
};
