const mongoose = require("mongoose");
const dealSchema = new mongoose.Schema({
  mainUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  offeringUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  artId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Art",
  },
  offeringPrice: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Deal = mongoose.model("Deal", dealSchema);
module.exports = Deal;
