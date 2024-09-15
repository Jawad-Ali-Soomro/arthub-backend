const Message = require("../models/message");

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversation: conversationId })
      .populate("sender receiver")
      .sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, conversation, content } = req.body;

    const newMessage = new Message({
      sender,
      receiver,
      conversation,
      content,
    });

    await newMessage.save();
    res.status(201).json({ message: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
