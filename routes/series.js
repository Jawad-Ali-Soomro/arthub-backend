const express = require("express");
const {
  create_series,
  add_art_to_series,
  delete_art_from_series,
  get_all_series,
  get_series_by_id
} = require("../controllers/series");
const series_route = express.Router();

series_route.post("/create", create_series);
series_route.post("/add", add_art_to_series);
series_route.delete("/delete", delete_art_from_series);
series_route.get("/get/all", get_all_series);
series_route.get("/get/:id", get_series_by_id);

module.exports = series_route;
