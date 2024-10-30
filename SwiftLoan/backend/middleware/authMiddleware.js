const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/UserModel");
const Admin = require("../model/AdminModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      console.log(token);
      console.log(process.env.JWT_SECRET ) ;
      jwt.verify(token, 'MahiSingh', { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token verification failed' });
        }
        req.user = decoded;
        next();
      });
    } catch (error) {
      res.status(401);
      console.log(error);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };

