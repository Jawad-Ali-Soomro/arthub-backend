const express = require("express");
const {
  create_art,
  get_all_arts,
  get_featured_images,
  get_featured_videos,
  get_art_by_id,
} = require("../controllers/art");
const art_route = express.Router();

art_route.post("/create", create_art);
art_route.get("/get/all", get_all_arts);
art_route.get("/get/featured/images", get_featured_images);
art_route.get("/get/featured/videos", get_featured_videos);
art_route.get("/get/art/:id", get_art_by_id);

module.exports = art_route;
