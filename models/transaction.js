const { default: mongoose } = require("mongoose");
const monogoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  artOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  artReciever: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  artId: { type: mongoose.Schema.Types.ObjectId, ref: "Art" },
  price: { type: Number },
  transaction_address: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
