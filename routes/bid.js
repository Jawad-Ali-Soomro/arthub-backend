const express = require("express");
const { createBid, getAllBids, getSingleBid } = require("../controllers/bid");
const bid_route = express.Router();

bid_route.post("/create", createBid);
bid_route.get("/getall", getAllBids);
bid_route.get("/get/:id", getSingleBid);

module.exports = bid_route;
