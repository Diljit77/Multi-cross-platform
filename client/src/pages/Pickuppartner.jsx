import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import AddPickupPartnerDialog from './Addpartner';
import { MyContext } from '../App';



function PickupPartner() {
    const [showDialog, setShowDialog] = useState(false);
   const [Pickuppartner,setpickuppartner]=useState([]);  
   const context =useContext(MyContext);
   useEffect(() => {
   setpickuppartner(context.Pickuppartner);
   console.log(Pickuppartner)
   });
   
    const handleAddPartner = (newPartner) => {
      setpickuppartner([...Pickuppartner, newPartner]);
    };
   
  return (<>
   <Header />
    <div className="flex">
  <Sidebar />
    <div className="flex-1">
  
    <div className="p-6" style={{height:"650px"}}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Pickup Partners</h2>
        <button
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Partner
        </button>

      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 border-b">ID</th>
              <th className="text-left p-4 border-b">Name</th>
              <th className="text-left p-4 border-b">Phone</th>
              <th className="text-left p-4 border-b">City</th>
              <th className="text-left p-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {Pickuppartner.map((partner) => (
              <tr key={partner._id} className="hover:bg-gray-50">
                <td className="p-4 border-b">{partner._id}</td>
                <td className="p-4 border-b">{partner.name}</td>
                <td className="p-4 border-b">{partner.phone}</td>
                <td className="p-4 border-b">{partner.address}</td>
                <td className="p-4 border-b">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      partner.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {partner.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <AddPickupPartnerDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onSubmit={handleAddPartner}
      />
    </div>
  </div>
    </>
  )
}

export default PickupPartner
