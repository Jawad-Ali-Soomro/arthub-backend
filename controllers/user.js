const catch_async_err = require("../middlewares/async-err");
const de_tokenize_data = require("../middlewares/de-tokenize-data");
const tokenize_data = require("../middlewares/sign-token");
const User = require("../models/user");
const Art = require("../models/art");
const bcrypt = require("bcryptjs");

exports.create_account = catch_async_err(async (req, res) => {
  const find_user_email = await User.findOne({ email: req.body.email });
  const find_user_handle = await User.findOne({ handle: req.body.handle });
  if (find_user_email) {
    return res.json({
      message: "User exists already!",
    });
  } else if (find_user_handle) {
    return res.json({
      message: "Handle Has Been Taken Already!",
    });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const created_account = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    if (!created_account) {
      return res.json({
        message: "Error while creating user account",
      });
    } else {
      return res.json({
        data: created_account,
      });
    }
  }
});

exports.login_user = catch_async_err(async (req, res) => {
  const find_user = await User.findOne({ email: req.body.email });
  if (!find_user) {
    return res.json({
      message: "User Not Found!",
    });
  }
  const check_password = await bcrypt.compare(
    req.body.password.toString(),
    find_user.password.toString()
  );
  if (!check_password) {
    return res.json({
      message: "Incorrect Password!",
    });
  }
  const token = await tokenize_data({ data: find_user.toObject() });
  res.cookie("token", token, { httpOnly: true }).json({
    message: "Logged In!",
    data: find_user,
    token,
  });
});

exports.get_profile = catch_async_err(async (req, res) => {
  const { token } = req.cookies;
  const find_user = await de_tokenize_data({ token });
  if (!find_user) {
    return res.json({
      message: "Error while fetching profile!",
    });
  }
  return res.json({
    data: find_user,
  });
});

exports.follow_unfollow_user = catch_async_err(async (req, res) => {
  const user_id = req.body.userId;
  const token = req.body.loggedInId;
  const logged_in_id = await de_tokenize_data({ token: token });
  const logged_in_user = await User.findById(logged_in_id._id);
  const user_to_follow = await User.findById(user_id);
  if (user_to_follow.followers.includes(logged_in_user._id)) {
    await user_to_follow.followers.pop(logged_in_id._id);
    await logged_in_user.following.pop(user_to_follow._id);
    await user_to_follow.save();
    await logged_in_user.save();
    return res.json({
      message: "User unfollowed!",
    });
  } else {
    user_to_follow.followers.push(logged_in_id._id);
    logged_in_user.following.push(user_to_follow._id);
    await user_to_follow.save();
    await logged_in_user.save();
    return res.json({
      message: "User followed!",
    });
  }
});

exports.get_user_by_id = catch_async_err(async (req, res) => {
  const { id } = req.params;
  const found_user = await User.findById(id)
    .populate("art")
    .populate("series")
    .populate("followers")
    .populate("following");
  return res.json({
    data: found_user,
  });
});

exports.get_top_users = catch_async_err(async (req, res) => {
  const users = await User.find({}).populate("art");
  return res.json({
    users,
  });
});

exports.updateUser = catch_async_err(async (req, res) => {
  const { userId } = req.params;
  const findUser = await User.findByIdAndUpdate(userId, req.body);
  if (!findUser) {
    return res.json({
      message: "Account Not Found!",
    });
  } else {
    return res.json({
      message: "Account Updated!",
    });
  }
});
