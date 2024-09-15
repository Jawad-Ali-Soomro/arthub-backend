const catch_async_err = require("../middlewares/async-err");
const Deal = require("../models/deal");

exports.createDeal = catch_async_err(async (req, res) => {
  const createdDeal = await Deal.create({
    mainUser: req.body.mainUser,
    offeringPrice: req.body.price,
    artId: req.body.artId,
    offeringUser: req.body.offering_user,
  });
  if (!createdDeal) {
    return res.json({
      message: "Error While Creating Your Offer!",
    });
  } else {
    return res.json({
      message: "Offer Created!",
    });
  }
});

exports.getDeals = catch_async_err(async (req, res) => {
  const { id } = req.params;
  const foundDeals = await Deal.find({ mainUser: id })
    .populate("offeringUser")
    .populate("artId");
  if (foundDeals) {
    return res.json({
      foundDeals,
    });
  } else {
    return res.json({
      message: "No Deals Found!",
    });
  }
});

exports.deleteDeal = catch_async_err(async (req, res) => {
  const { id } = req.params;
  const foundDeal = await Deal.findOneAndDelete(id);
  if (!foundDeal) {
    return res.json({
      message: "Deal Not Found!",
    });
  } else {
    return res.json({
      message: "Offer Rejected!",
    });
  }
});
