import PickupPartner from "../models/Pickupartner.js";
import Transaction from "../models/Transaction.js";
import { createRazorpayContact,createRazorpayFundAccount } from "../services/payoutservices.js";
// ✅ Create a new partner
export const createPartner = async (req, res) => {
  try {
    const { name, phone, email, address, earningsPerOrder, status } = req.body;

    const partner = await PickupPartner.create({
      name,
      phone,
      email,
      address,
      status,
      earningsPerOrder,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Partner created", partner:partner,success:true });
  } catch (error) {
    res.status(500).json({ message: "Failed to create partner", error: error.message ,success:false});
  }
};


export const transfertopartner = async (req, res) => {
  try {
    const partner = await PickupPartner.findById(req.params.partnerId);
    const { amount } = req.body;

    if (!partner) return res.status(404).send("Partner not found");

    // Update wallet balance
    partner.wallet += amount;
    await partner.save();

    // Save transaction record
    const transaction = new Transaction({
      partnerId: partner._id,
      amount,
      method: "wallet",
      status: "completed",
      type:"debit",
    });
    await transaction.save();

    res.status(200).json({
      success:true,
      message: "transfered succesfully",
      newWalletBalance: partner.wallet,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server Error" });
  }

}




export const setupPartner = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      earningsPerOrder,
      accountNumber,
      ifsc,
      createdBy,
    } = req.body;

    // 1️⃣ Create Razorpay Contact
    const contact = await createRazorpayContact({ name, email, phone });

    // 2️⃣ Create Razorpay Fund Account
    const fundAccount = await createRazorpayFundAccount(contact.id, {
      accountNumber,
      ifsc,
    });

    // 3️⃣ Create PickupPartner (location will be auto-set via pre-save hook)
    const newPartner = new PickupPartner({
      name,
      phone,
      email,
      address,
      earningsPerOrder,
      createdBy,
    });

    await newPartner.save(); // location coordinates will be set here

    res.status(201).json({
      success: true,
      message: "Pickup partner created and geocoded successfully",
      data: {
        partner: newPartner,
        razorpayContactId: contact.id,
        razorpayFundAccountId: fundAccount.id,
      },
    });
  } catch (error) {
    console.error("Error in setupPartner:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create pickup partner",
    });
  }
};


// ✅ Get all partners for the current MCP
export const getAllPartners = async (req, res) => {
  try {
    const partners = await PickupPartner.find({ createdBy: req.user._id });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch partners" });
  }
};

// ✅ Update partner info
export const updatePartner = async (req, res) => {
  try {
    const partner = await PickupPartner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    if (partner.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await PickupPartner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ message: "Partner updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ✅ Delete a partner
export const deletePartner = async (req, res) => {
  try {
    const partner = await PickupPartner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });

    if (partner.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await PickupPartner.findByIdAndDelete(req.params.id);
    res.json({ message: "Partner deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
