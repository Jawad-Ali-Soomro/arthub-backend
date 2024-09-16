const catch_async_err = require("../middlewares/async-err");
const de_tokenize_data = require("../middlewares/de-tokenize-data");
const Art = require("../models/art");
const User = require("../models/user");
const Series = require("../models/series");

exports.create_art = catch_async_err(async (req, res) => {
  // const { token } = req.body;
  // const data = await de_tokenize_data({ token: token });
  const created_art = await Art.create({ ...req.body });
  const owner = await User.findById(req.body.owner);
  created_art.previous_owners.push(req.body.owner);
  await created_art.save();
  owner.art.push(created_art._id);
  await owner.save();
  return res.json({
    data: created_art,
    message: "Art Created!",
  });
});

exports.get_all_arts = catch_async_err(async (req, res) => {
  const found_arts = await Art.find({}).populate("owner").populate("series");

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

exports.delete_art = catch_async_err(async (req, res) => {
  const { id } = req.params;
  const foundArt = await Art.findById(id);

  if (!foundArt) {
    return res.json({
      message: "Art Not Found",
    });
  } else {
    const owner = await User.findById(foundArt.owner._id);
    const series = await Series.findById(foundArt.series[0]);

    if (owner) {
      owner.art = owner.art.filter(
        (artId) => artId.toString() !== foundArt._id.toString()
      );
      await owner.save();
    }

    if (series) {
      series.art = series.art.filter(
        (artId) => artId.toString() !== foundArt._id.toString()
      );
      await series.save();
    }

    await Art.findByIdAndDelete(foundArt._id);

    return res.json({
      message: "Art Deleted!",
    });
  }
});
