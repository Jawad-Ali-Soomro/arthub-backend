const catch_async_err = require("../middlewares/async-err");
const Art = require("../models/art");
const Transaction = require("../models/transaction");
const User = require("../models/user");

exports.createTransaction = catch_async_err(async (req, res) => {
  const { artReciever, artOwner, artId, price, transaction_address } = req.body;

  const findSender = await User.findById(artOwner);
  const findReceiver = await User.findById(artReciever);
  const findArt = await Art.findById(artId);

  if (!findSender || !findReceiver || !findArt) {
    return res.json({
      message: "Invalid art owner, receiver, or art ID",
    });
  }

  // Create the transaction
  const createdTransaction = await Transaction.create({
    artReciever,
    artOwner,
    artId,
    price,
    transaction_address,
  });

  if (createdTransaction) {
    // Assign new owner and update records
    findArt.owner = findReceiver._id; // Corrected assignment of the new owner
    findArt.previous_owners.push(findSender._id); // Add sender to previous owners
    findArt.transactions.push(createdTransaction._id); // Add transaction to art's transaction history

    // Update sender's and receiver's art collections
    findSender.art = findSender.art.filter(
      (art) => art.toString() !== findArt._id.toString()
    ); // Remove art from sender
    findReceiver.art.push(findArt._id); // Add art to receiver

    // Save updated art, sender, and receiver
    await findArt.save();
    await findSender.save();
    await findReceiver.save();

    return res.json({
      message: "Transaction Done!",
      data: createdTransaction,
    });
  } else {
    return res.json({
      message: "Error During Transaction",
    });
  }
});
