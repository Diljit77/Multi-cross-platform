import React, { useContext, useState } from "react";
import { PostData } from "../utils/api";
import { MyContext } from "../App";
import { toast } from "react-toastify";
const AddMoneyDialog = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");
const context=useContext(MyContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
  
   
    PostData("/api/wallet/add",{amount}).then((res)=>{
        if(res.success===true){
         
              toast.success(`₹${amount} added to wallet successfully 💰`);
              onClose();
        }else{
            context.setalertbox({
                msg:res.message,
                error:true,
                open:true
              })  
        }
    }).catch(err=>console.log(err));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Add Money to Wallet</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Money
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AddMoneyDialog;
