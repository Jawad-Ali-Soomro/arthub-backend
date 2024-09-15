const express = require("express");
const message_router = express.Router();
const messageController = require("../controllers/messageController");
const { getMessages } = require("../controllers/messageController");
const { sendMessage } = require("../controllers/messageController");

// Get messages for a conversation
message_router.get("/get/:conversationId", getMessages);

// Send a new message
message_router.post("/send", sendMessage);

module.exports = message_router;
