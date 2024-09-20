const mongoose = require("mongoose");

const series_schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },
  art: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
    },
  ],
});

const Series = mongoose.model("Series", series_schema);
module.exports = Series;
