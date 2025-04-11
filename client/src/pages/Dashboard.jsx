import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { IoWallet } from "react-icons/io5";

import { MyContext } from '../App';



function Dashboard() {
  const [totalbalance,settotalbalance]=useState(0)
  const [Pickuppartner,setpickuppartner]=useState([])
  const context=useContext(MyContext);
  const [order,setorder]=useState([])
useEffect(() => {
settotalbalance(context.totalbalance);
setorder(context.order);
setpickuppartner(context.Pickuppartner);
})



    
      const orders = [
        { id: "#00238", partner: "John Sheen", status: "Pending", details: "Main Street" },
        { id: "#04125", partner: "Mac Crave", status: "In Progress", details: "Park Avenue" },
        { id: "#00263", partner: "Mike William", status: "Completed", details: "1st Avenue" },
        { id: "#02365", partner: "John Sheen", status: "Pending", details: "Broadway" },
      ];
    
      const getStatusColor = (status) => {
        switch (status) {
          case "Active": return "bg-green-100 text-green-700";
          case "Inactive": return "bg-green-50 text-green-400";
          case "Pending": return "bg-blue-100 text-blue-700";
          case "In Progress": return "bg-yellow-100 text-yellow-700";
          case "Completed": return "bg-blue-200 text-blue-800";
          default: return "";
        }
      };
  return (<>
   <Header />
    <div className="flex">
  <Sidebar />
    <div className="flex-1">
  
      <div className="p-6">
        {/* Cards and charts or tables can go here */}
        <h3 className="text-xl font-bold">Dashboard</h3>
        <div className="grid grid-cols-3 gap-7 mb-8">
        <div className="bg-white flex  items-center  gap-8 shadow-md p-5 rounded-lg">
            <IoWallet className='' style={{fontSize:"30px",color:"blue"}} />
            <div className="space-y-2">
            <div className="text-gray-500">Wallet Balance</div>
            <div className="text-xl font-bold mt-1">₹ {totalbalance}</div>
            </div>
      
        </div>
        <div className="bg-white shadow-md p-5 rounded-lg">
          <div className="text-gray-500">Pickup Partners</div>
          <div className="text-xl font-bold mt-1">{Pickuppartner.length}</div>
        </div>
        <div className="bg-white shadow-md p-5 rounded-lg">
          <div className="text-gray-500 mb-2">Orders</div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Pending</span><span>10</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>In Progress</span><span>10</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Completed</span><span>50</span>
          </div>
        </div>
      </div>

      {/* Pickup Partners */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Pickup Partners</h2>
          <button className="bg-blue-500 text-white px-4 py-1 rounded">+ Add Partner</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
             
              <th className="p-4">Earnings per Order</th>
            </tr>
          </thead>
          <tbody>
            {Pickuppartner.map((partner, idx) => (
              <tr key={idx} className="border-b text-gray-700">
                <td className="p-4">{partner.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${getStatusColor(partner.status)}`}>
                    {partner.status}
                  </span>
                </td>
             
                <td className="p-4">₹ {partner.earningsPerOrder
                }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Orders</h2>
        <table className="min-w-full  bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="p-4">Order ID</th>
              <th className="p-4">Pickup Partner</th>
              <th className="p-4">Status</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order, idx) => (
              <tr key={idx} className="border-b text-gray-700">
                <td className="p-4">{order.orderId}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">{order.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default Dashboard
