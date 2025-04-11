import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import { PostData } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddOrderDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
const [Pickuppartner,setpickuppartner]=useState([]);
const [selctedPartner,setSelectedPartner]=useState()
const [customerName,setcustomerName]=useState("");
const [address,setaddress]=useState("");
const [orderId,setorderId]=useState("");
const [pickupid,setpickupid]=useState();
const [amount,setamount]=useState();
const context=useContext(MyContext);
useEffect(() => {
setpickuppartner(context.Pickuppartner);
})
const history=useNavigate();
const addorder=(e)=>{
e.preventDefault();
const assignedTo=pickupid||null;
console.log(pickupid)
if(customerName===""){
  context.setalertbox({
    msg:"please fill the customer Name",
    error:true,
    open:true
  })
  return ;
}
if(orderId===""){
  context.setalertbox({
    msg:"please fill the order Id",
    error:true,
    open:true
  })
  return ;
}
if(address===""){
  context.setalertbox({
    msg:"please fill the address",
    error:true,
    open:true
  })
  return ;
}
if(amount==="" ||amount===undefined ||amount===null){
  context.setalertbox({
    msg:"please fill the amount",
    error:true,
    open:true
  })
  return;
}

PostData("/api/orders/",{orderId,customerName,address,amount,assignedTo}).then((res)=>{
  if(res.success===true){
    context.setalertbox({
      msg:res.message,
      error:false,
      open:true
    })
    history("/");
  }else{
    context.setalertbox({
      msg:res.message,
      error:true,
      open:true
    })
  }
})
}
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4">Add New Order</h2>
        <form className="space-y-4" onSubmit={addorder}>
          <div>
            <label className="block text-sm font-medium">Customer Name</label>
            <input
              type="text"
              value={customerName}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter customer name"
              onChange={(e)=>setcustomerName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Order ID</label>
            <input
            value={orderId}
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter order ID"
              onChange={(e)=>setorderId(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Delivery Address</label>
            <textarea
            value={address}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter address"
              rows="3"
              onChange={(e)=>setaddress(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
            value={amount}
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter amount"
              onChange={(e)=>setamount(e.target.value)}
            />
          </div>
          <div className="mb-5">
          <label htmlFor="pickupPartner " className="block text-sm font-medium">Select Pickup Partner (optional)</label>
      <select
        id="pickupPartner"
        value={pickupid}
        className="w-full border border-gray-300 rounded-md p-2"

  onChange={(e) => setpickupid(e.target.value)}
      >
        <option value="">-- Select Partner --</option>
        {Pickuppartner.map((partner) => (
          <option key={partner._id} value={partner._id}>
            {partner.name}
          </option>
        ))}
      </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Add Order
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

export default AddOrderDialog;
