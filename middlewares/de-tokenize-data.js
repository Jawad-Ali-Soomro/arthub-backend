const jwt = require("jsonwebtoken");
const de_tokenize_data = async ({ token }) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = de_tokenize_data;
