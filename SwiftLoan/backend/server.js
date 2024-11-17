const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');


const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const AdminRoutes =require("./routes/AdminRoutes");
const  LoanRoutes = require("./routes/LoanRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors({
     origin: 'https://dazzling-creponne-1de514.netlify.app', // Frontend origin
     credentials: true,
   }));

app.get("/", (req, res)=>{
     res.send("server is running ");
});

app.use("/api/user" , userRoutes);
app.use("/api/admin", AdminRoutes)
app.use("/api/loan" , LoanRoutes);
app.use("/api/payment",paymentRoutes);


const Port =  process.env.Port || 5000;


const server = app.listen(Port , console.log(`Server is Running at port ${Port}`));

