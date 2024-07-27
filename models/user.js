const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const user_schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username!"],
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    require: [true, "Please enter email!"],
  },
  handle: {
    type: String,
    required: [true, "Please enter handle!"],
    unique: [true, "Handle has already been taken!"],
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter password!"],
  },
  wallet_address: {
    type: String,
  },
  links: [
    {
      facebook: String,
      twitter: String,
      instagram: String,
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  series: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
    },
  ],
  art: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  isPrime: {
    type: Boolean,
    default: false,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  createdBids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },
  ],
  Bids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },
  ],
});

const User = mongoose.model("User", user_schema);
module.exports = User;
