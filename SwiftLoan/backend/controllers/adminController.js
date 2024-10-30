const asyncHandler = require("express-async-handler");
const Admin = require("../model/AdminModel");
const  generateToken  = require("../config/generateToken")


const registerAdmin = asyncHandler(async (req, res) => {
  console.log("reques tcojdndeie ");
  const { name, email, phnumber, sex, password, pic, address } = req.body;

  
  if (!name || !email || !password || !phnumber || !sex || !address) {
    res.status(400);
    console.log("bad request");
    return res.json({ message: "Please fill in all required fields." });
  }


  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(403);
    return res.json({ message: "Admin already exists." });
  }

  const admin = await Admin.create({
    name,
    email,
    phnumber,
    sex,
    password,
    pic,
    address,
  });


  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phnumber: admin.phnumber,
      sex: admin.sex,
      pic: admin.pic,
      address: admin.address,
      token: generateToken(admin._id),
    });
  } else {
    res.status(405);
    return res.json({ message: "Failed to create admin." });
  }
});


const authAdmin = asyncHandler(async (req, res) => {
  console.log("request  comes to admin auth ")
  const { email, password } = req.body;
  console.log(email, password);
  

  const admin = await Admin.findOne({ email });
  console.log(admin);


  if (admin && (await admin.matchPassword(password))) {


    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phnumber: admin.phnumber,
      sex: admin.sex,
      pic: admin.pic,
      address: admin.address,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    return res.json({ message: "Invalid email or password." });
  }
});

module.exports = { registerAdmin, authAdmin };
