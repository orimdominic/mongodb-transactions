const { Schema, model } = require("mongoose");

const transferSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Transfer", transferSchema);
