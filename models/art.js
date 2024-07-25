const mongoose = require("mongoose");

const art_schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title!"],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  previous_owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  price: {
    type: Number,
    required: [true, "Please enter price!"],
  },
  tags: [{ type: String }],
  series: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
    },
  ],
  uploaded_at: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    default: "image",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  likedby: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Art = mongoose.model("Art", art_schema);
module.exports = Art;
