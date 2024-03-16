const mongoose = require("mongoose");
const Account = require("../models/Account");

module.exports.balance_get = (async (req, res) => {
    try {
        const account = await Account.find({
            userId: req.userId
        });

        res.status(200).json({ balance: account[0].balance });
    }
    catch (err) {
        res.status(403).json({ error: err });
    }
});

module.exports.transfer = (async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const { amount, to } = req.body;

        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            throw new Error("You're too broke to do that lol!");
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            throw new Error("Invalid account!");
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transfer successful!"
        });
    }
    catch (error) {
        await session.abortTransaction();
        res.status(400).json({
            error: error.message
        });
    }
    finally {
        session.endSession();
    }
});
