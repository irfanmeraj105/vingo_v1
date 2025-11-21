const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      // renamed to match frontend input
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "owner", "deliveryBoy"], // lowercase
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
