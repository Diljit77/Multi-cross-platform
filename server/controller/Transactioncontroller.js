import Transaction from "../models/Transaction.js";


// ✅ Get Wallet Summary
export const getWalletSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ userId });

    let totalCredits = 0;
    let totalDebits = 0;

    transactions.forEach((tx) => {
      if (tx.type === "credit") totalCredits += tx.amount;
      else totalDebits += tx.amount;
    });

    const balance = totalCredits - totalDebits;

    res.json({ balance, totalCredits, totalDebits, transactions ,success:true});
  } catch (err) {
    res.status(500).json({ message: "Error fetching wallet data" ,success:false});
  }
};

// ✅ Add Money to Wallet
export const addMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    const transaction = await Transaction.create({
      userId: req.user._id,
      type: "credit",
      amount,
      message: "Money added to wallet",
    });

    res.status(201).json({ message: "Money added", transaction ,success:true});
  } catch (err) {
    res.status(500).json({ message: "Failed to add money" ,success:false });
  }
};

// ✅ Transfer to Pickup Partner
export const transferToPartner = async (req, res) => {
  try {
    const { partnerId, amount } = req.body;

    // Calculate current balance
    const txns = await Transaction.find({ userId: req.user._id });
    let totalCredits = 0;
    let totalDebits = 0;

    txns.forEach((tx) => {
      if (tx.type === "credit") totalCredits += tx.amount;
      else totalDebits += tx.amount;
    });

    const balance = totalCredits - totalDebits;

    if (amount > balance) {
      return res.status(400).json({ message: "Insufficient balance",success:false });
    }

    // Record debit transaction
    const txn = await Transaction.create({
      userId: req.user._id,
      type: "debit",
      amount,
      message: `Transferred to Pickup Partner ID: ${partnerId}`,
    });

    res.status(201).json({ message: "Transfer successful", success:true, transaction: txn });
  } catch (err) {
    res.status(500).json({ message: "Transfer failed" ,success:false});
  }
};
