import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'



function Notification() {
    const notifications = [
        { id: 1, message: "New order placed by Partner ID: #P1234" },
        { id: 2, message: "Wallet updated: ₹500 added successfully" },
        { id: 3, message: "Pickup Partner #A5678 assigned to Order #O7890" },
        { id: 4, message: "New order placed by Partner ID: #P1234" },
        { id: 5, message: "Wallet updated: ₹500 added successfully" },
        { id: 6, message: "Pickup Partner #A5678 assigned to Order #O7890" },
        { id: 7, message: "New order placed by Partner ID: #P1234" },
        { id: 8, message: "Wallet updated: ₹500 added successfully" },
        { id: 9, message: "Pickup Partner #A5678 assigned to Order #O7890" },
      ];
  return (<>
   <Header />
    <div className="flex">
  <Sidebar />
    <div className="flex-1">
  
    <div className="p-6 ">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="bg-white shadow-md border border-gray-200 rounded-lg p-4"
          >
            <p className="text-gray-800 text-sm">{note.message}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  </div>
    </>
  )
}

export default Notification
