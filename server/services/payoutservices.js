
import dotenv from 'dotenv';
dotenv.config();

import razorpay from '../config/razorpay.js';
export const createRazorpayContact = async ({ name, email, phone }) => {
    try {
        return await razorpay.contacts.create({
            name,
            email,
            contact: phone,
            type: 'employee',
            reference_id: `partner_${Date.now()}`,
          });
    } catch (error) {
        console.log(error+"my")
    }

};

export const createRazorpayFundAccount = async (contactId, { accountNumber, ifsc }) => {
  return await razorpay.fundAccount.create({ // ✅ fixed this lin
    contact_id: contactId,
    account_type: 'bank_account',
    bank_account: {
      name: 'Pickup Partner',
      ifsc,
      account_number: accountNumber,
    },
  });
};
