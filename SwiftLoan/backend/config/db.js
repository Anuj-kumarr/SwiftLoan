const mongoose = require("mongoose");
const connectDB = async () => {
   
    const mongoLink = process.env.mongoLink;
    
  try {
    const conn = await mongoose.connect(mongoLink, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
      });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`error:${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;