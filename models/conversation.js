const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema({
  user_one: { type: Schema.Types.ObjectId, ref: "User" },
  user_two: { type: Schema.Types.ObjectId, ref: "User" },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
