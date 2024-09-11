const express = require("express");
const {
  create_account,
  login_user,
  get_profile,
  follow_unfollow_user,
  get_user_by_id,
  get_top_users,
  updateUser,
} = require("../controllers/user");
const user_route = express.Router();

user_route.post("/create", create_account);
user_route.post("/login", login_user);
user_route.get("/profile", get_profile);
user_route.patch("/toggle/follow", follow_unfollow_user);
user_route.get("/get/:id", get_user_by_id);
user_route.get("/allUsers", get_top_users);
user_route.patch("/update/:userId", updateUser);

module.exports = user_route;
