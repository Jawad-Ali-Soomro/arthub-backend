const Conversation = require("../models/conversation");
const User = require("../models/user");

exports.startConversation = async (req, res) => {
  try {
    const { userOneId, userTwoId } = req.body;

    const existingConversation = await Conversation.findOne({
      $or: [
        { user_one: userOneId, user_two: userTwoId },
        { user_one: userTwoId, user_two: userOneId },
      ],
    });

    if (existingConversation) {
      return res.status(200).json({ conversation: existingConversation });
    }

    const newConversation = new Conversation({
      user_one: userOneId,
      user_two: userTwoId,
    });

    await newConversation.save();
    res.status(201).json({ conversation: newConversation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({
      $or: [{ user_one: userId }, { user_two: userId }],
    }).populate("user_one user_two");

    res.status(200).json({ foundConversations: conversations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
