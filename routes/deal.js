const express = require("express");
const { createDeal, getDeals } = require("../controllers/deal");
const deal_route = express.Router();

deal_route.post("/create", createDeal);
deal_route.get("/get/:id", getDeals);

module.exports = deal_route;
