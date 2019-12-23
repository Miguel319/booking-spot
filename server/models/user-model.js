const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    min: [4, "The username must have at least 4 characters."],
    max: [32, "The username can't have  more than 32 characters."]
  },
  email: {
    type: String,
    required: true,
    email: true,
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
  },
  password: {
    type: String,
    required: true,
    min: [4, "The password must have at least 4 characters."],
    max: [32, "The username can't have  more than 32 characters."]
  },
  rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }]
});

userSchema.pre("save", next => {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
