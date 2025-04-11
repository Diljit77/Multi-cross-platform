import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../App";
import { PostData } from "../utils/api";

const TransferToPartnerDialog = ({ isOpen, onClose, onSubmit }) => {
  const [partnerId, setPartnerId] = useState("");
  const [amount, setAmount] = useState("");
  const [partners, setPartners] = useState([]);
const context=useContext(MyContext);
  // Fetch pickup partners for dropdown

  useEffect(() => {
setPartners(context.Pickuppartner);

    
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!partnerId || !amount) return;
    // onSubmit({ partnerId, amount });
    setPartnerId("");
    setAmount("");
    PostData(`/api/wallet/transfer`,{amount,partnerId}).then((res)=>{
        if(res.success===true){
            context.setalertbox({
                msg:res.message,
                error:false,
                open:true
              })  
              onClose();
        }else{
            context.setalertbox({
                msg:res.message,
                error:true,
                open:true
              })  
        }
    })
 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Transfer to Partner</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Select Partner</label>
            <select
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="">-- Choose --</option>
              {partners.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p.phone})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Amount (₹)</label>
            <input
              type="text"
              min="1"
              className="w-full border rounded p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              Transfer
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default TransferToPartnerDialog;

