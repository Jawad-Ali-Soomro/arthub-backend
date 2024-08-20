const catch_async_err = require("../middlewares/async-err");
const de_tokenize_data = require("../middlewares/de-tokenize-data");
const Art = require("../models/art");
const User = require("../models/user");

exports.create_art = catch_async_err(async (req, res) => {
  const { token } = req.cookies;
  const data = await de_tokenize_data({ token: token });
  const created_art = await Art.create({ ...req.body, owner: data._id });
  const owner = await User.findById(data._id);
  created_art.previous_owners.push(owner._id);
  await created_art.save();
  owner.art.push(created_art._id);
  await owner.save();
  return res.json({
    data: created_art,
  });
});

exports.get_all_arts = catch_async_err(async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default page and limit values
  const skip = (page - 1) * limit;

  const found_arts = await Art.find({})
    .populate("owner")
    .populate("series")
    .skip(skip)
    .limit(Number(limit));

  return res.json({
    data: found_arts,
  });
});

exports.get_featured_images = catch_async_err(async (req, res) => {
  const found_arts = await Art.find({ featured: true, type: "image" })
    .populate("owner")
    .populate("series");
  return res.json({
    data: found_arts,
  });
});

exports.get_featured_videos = catch_async_err(async (req, res) => {
  const found_arts = await Art.find({ featured: true, type: "video" })
    .populate("owner")
    .populate("series");
  return res.json({
    data: found_arts,
  });
});

exports.get_art_by_id = catch_async_err(async (req, res) => {
  const { id } = req.params;
  const found_arts = await Art.findById(id)
    .populate("previous_owners")
    .populate("series")
    .populate("owner");
  return res.json({
    data: found_arts,
  });
});
