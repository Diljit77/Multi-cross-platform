import React, { useContext, useState } from "react";
import { MyContext } from "../App";
import { PostData } from "../utils/api";

const AddPickupPartnerDialog = ({ isOpen, onClose, onSubmit }) => {
  const context=useContext(MyContext);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email,setemail]=useState("")
  const [city,setcity]=useState("");
  const [earningperorder,setearningperorder]=useState("")
  const [formdata,setformdata]=useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !contact) return;
    // onSubmit({ name, contact });
    setName("");
    setContact("");
    onClose();
    formdata.name=name,
    formdata.phone=contact,
    formdata.address=city,
    formdata.earningsPerOrder=earningperorder
    formdata.email=email;

console.log(formdata)
PostData("/api/partners/",formdata).then((res)=>{
  if(res.success===true){
  
      context.setalertbox({
        msg:res.message,
        error:false,
        open:true
      })
    }else{
 
        context.setalertbox({
          msg:res.message,
          error:true,
          open:true
        })
    }
}).catch(err=>console.log(err))
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Pickup Partner</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contact</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">city</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Earning per Order</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={earningperorder}
              onChange={(e) => setearningperorder(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPickupPartnerDialog;
