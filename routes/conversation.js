const express = require("express");
const conversation_router = express.Router();
const conversationController = require("../controllers/conversation");

// Start a new conversation
conversation_router.post("/start", conversationController.startConversation);

// Get all conversations for a user
conversation_router.get(
  "/get/all/:userId",
  conversationController.getUserConversations
);

module.exports = conversation_router;
