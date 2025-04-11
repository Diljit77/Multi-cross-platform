import razorpay from "../config/razorpay.js";

// Create Razorpay Contact
export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const response = await razorpay.contacts.create({
        name,
        email,
        contact: phone,
        type: 'employee',
        reference_id: `partner_${Date.now()}`,
      });
  
      console.log("✅ Razorpay Contact Created:", response);
    
  

    res.status(200).json({ success: true, contact });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create Fund Account
export const createFundAccount = async (req, res) => {
  try {
    const { contactId, accountHolderName, ifsc, accountNumber } = req.body;
    const fundAccount = await razorpay.fundAccount.create({
      contact_id: contactId,
      account_type: "bank_account",
      bank_account: {
        name: accountHolderName,
        ifsc,
        account_number: accountNumber,
      },
    });

    res.status(200).json({ success: true, fundAccount });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create Payout
export const createPayout = async (req, res) => {
  try {
    const { fundAccountId, amount, mode } = req.body;

    const payout = await razorpay.payouts.create({
      account_number: "232323005432", // Razorpay’s virtual account number
      fund_account_id: fundAccountId,
      amount: amount * 100, // in paisa
      currency: "INR",
      mode: mode || "IMPS",
      purpose: "payout",
      queue_if_low_balance: true,
    });

    res.json({ success: true, payout });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
