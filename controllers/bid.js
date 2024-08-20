const catch_async_err = require("../middlewares/async-err");
const Bid = require("../models/auction");

exports.createBid = async (req, res) => {
  try {
    const { art, startingBid, startTime, endTime } = req.body;

    // Create a new bid instance
    const newBid = await Bid.create({
      art,
      startingBid,
      startTime,
      endTime,
      currentBid: startingBid,
      currentBidder: null,
      owner,
    });

    res.json(newBid);
  } catch (error) {
    res.status(500).json({ error: "Failed to create bid" });
  }
};

exports.getAllBids = catch_async_err(async (req, res) => {
  const bids = await Bid.find({}).populate("art").populate("owner");
  return res.json({
    bids,
  });
});

exports.getSingleBid = catch_async_err(async (req, res) => {
  const id = req.params.id;
  const bids = await Bid.findById(id);
  return res.json({
    bids,
  });
});
