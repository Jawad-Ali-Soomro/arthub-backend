const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
  art: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Art",
    required: true,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  currentBid: {
    type: Number,
    required: false,
  },
  currentBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endTime: {
    type: Date,
    required: true,
  },
  bids: [
    {
      bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      bidTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

BidSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Bid = mongoose.model("Bid", BidSchema);

module.exports = Bid;
