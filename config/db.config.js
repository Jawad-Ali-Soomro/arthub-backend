const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`database connected`);
  });
};

module.exports = connectDatabase