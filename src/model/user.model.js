const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

module.exports = model("User", userSchema);
