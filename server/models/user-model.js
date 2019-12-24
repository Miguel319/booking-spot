const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    min: [4, "The username must have at least 4 characters."],
    max: [32, "The username can't have  more than 32 characters."]
  },
  email: {
    type: String,
    required: [true, "The email field is mandatory."],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
  },
  password: {
    type: String,
    required: [true, "The password field is mandatory."],
    min: [4, "The password must have at least 4 characters."],
    max: [32, "The username can't have  more than 32 characters."],
    select: false
  },
  passwordConfirmation: {
    type: String,
    select: false,
        
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  rentals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rental" }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Password hash & salt
UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
