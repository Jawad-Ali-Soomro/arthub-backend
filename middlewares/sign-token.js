const jwt = require("jsonwebtoken");
const tokenize_data = async ({ data }) => {
  return await jwt.sign(data, process.env.JWT_SECRET);
};

module.exports = tokenize_data;
