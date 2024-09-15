const express = require("express");
const { createDeal, getDeals, deleteDeal } = require("../controllers/deal");
const deal_route = express.Router();

deal_route.post("/create", createDeal);
deal_route.get("/get/:id", getDeals);
deal_route.delete("/delete/:id", deleteDeal);

module.exports = deal_route;
