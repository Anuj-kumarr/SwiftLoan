const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phNumber: { type: Number, unique: true, required: true },

    sex: {
      type: String,
      enum: ['male', 'female', 'not prefer'], 
      required: true,
    },
    
    password: { type: String, required: true },
    
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    address: { 
      type: String, 
      required: true,
      validate: {
        validator: function (v) {
          return v.split(' ').length >= 3; 
        },
        message: props => `Address must be at least 3 words!`
      },
    },

  },
  { timestamps: true }
);


adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
