const mongoose = require("mongoose");
const UserModel = require("../model/user.model");
const TransferModel = require("../model/transfer.model");

async function transferFunds(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { senderId, recipientId, amount } = req.body;

    const [sender, recipient] = await Promise.all([
      UserModel.findById(senderId),
      UserModel.findById(recipientId),
    ]);

    if (!sender || !recipient) {
      throw new Error("Sender/Recipient not found");
    }

    /**
     * We should check the sender's balance before effecting a transfer but
     * for the sake of this example, we want to show that the transaction will
     * be aborted if an error occurs between 2 and 3 as explained in the article

      if(sender.balance < amount){
        throw new Error("Insufficient balance")
      }
     */

    // deduct amount from sender's balance
    const updatedSender = await UserModel.findByIdAndUpdate(
      senderId,
      {
        $inc: { balance: -amount },
      },
      {
        session,
        new: true,
      }
    );

    // throw error to abort process if sender is broke 😁
    if (updatedSender.balance < 0) {
      throw new Error("Insufficient balance 😬");
    }

    // add amount to recipient's balance
    await UserModel.findByIdAndUpdate(
      recipientId,
      {
        $inc: {
          balance: amount,
        },
      },
      {
        session,
        new: true,
      }
    );

    // keep a record of the transaction
    await TransferModel.create({
      recipientId: recipient._id,
      senderId: sender._id,
      amount,
    });

    await session.commitTransaction();

    return res.json({
      status: "success",
      message: "Transaction completed successfully",
    });
  } catch (error) {
    // abort process and reverse any operation that has occurred
    await session.abortTransaction();

    // end transaction session
    session.endSession();
    next(error);
  }
}

module.exports = {
  transferFunds,
};