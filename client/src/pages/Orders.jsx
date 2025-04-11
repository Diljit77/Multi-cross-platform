import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import AddOrderDialog from './Addorder';
import { MyContext } from '../App';



function Orders() {


    const [showDialog, setShowDialog] = useState(false);
    const [order,setorder]=useState([])
const context=useContext(MyContext);
useEffect(() => {

setorder(context.order);
},[]);

    const orders = [
        {
          id: "O12345",
          partner: "Pickup Partner #P1001",
          status: "Pending",
          amount: "₹750",
          date: "2025-04-08",
        },
        {
          id: "O12346",
          partner: "Pickup Partner #P1002",
          status: "Completed",
          amount: "₹1,250",
          date: "2025-04-07",
        },
        {
          id: "O12347",
          partner: "Pickup Partner #P1003",
          status: "In Progress",
          amount: "₹500",
          date: "2025-04-06",
        },
      ];
    
  return (<>
   <Header />
    <div className="flex">
  <Sidebar />
    <div className="flex-1">
  
    <div className="p-6" style={{height:"700px"}}>
        <div className="flex justify-between mb-3">
        <h2 className="text-2xl font-semibold mb-6">Orders</h2>
        <button
        onClick={() => setShowDialog(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Order
      </button>
        </div>
  
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 border-b">Order ID</th>
              <th className="text-left p-4 border-b">Pickup Partner</th>
              <th className="text-left p-4 border-b">Status</th>
              <th className="text-left p-4 border-b">Amount</th>
              <th className="text-left p-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
         
            {order.length!==0 && order.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-4 border-b">{order.orderId}</td>
                <td className="p-4 border-b">{order.assignedTo?.name}</td>
                <td className="p-4 border-b">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 border-b">{order.amount}</td>
                <td className="p-4 border-b">{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <AddOrderDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />
    </div>
  </div>
    </>
  )
}

export default Orders;
