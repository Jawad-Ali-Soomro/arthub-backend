const express = require("express");
const { createTransaction } = require("../controllers/transaction");
const transaction_route = express.Router();

transaction_route.post("/create", createTransaction);

module.exports = transaction_route;
