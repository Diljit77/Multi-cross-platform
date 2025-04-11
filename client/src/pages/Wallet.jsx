import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../App';
import Transaction from '../../../server/models/Transaction';
import TransferToPartnerDialog from './Transfertopartner';
import AddMoneyDialog from './Addmoney';


function Wallet() {
    const [balance, setBalance] = useState(1000);
    const [totalcredits,settotalcredits]=useState(0);
    const [totaldebits,settotaldebits]=useState(0)
    const context=useContext(MyContext);
    const [transactions, setTransactions] = useState([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showTransferDialog, setShowTransferDialog] = useState(false);
    const handleAddMoney = () => {
      const amount = 500; // Simulated input
      setBalance(balance + amount);
      setTransactions([
        { id: Date.now(), date: new Date().toISOString().split('T')[0], description: 'Added to Wallet', amount: `+₹${amount}` },
        ...transactions
      ]);
    };
    useEffect(()=>{
      setTimeout(() => {
        setBalance(context.totalbalance);
      settotalcredits(context.walletdetails.totalCredits);
      settotaldebits(context.walletdetails.totalDebits);
      setTransactions(context?.walletdetails.transactions);
   
      }, 1000);
      
    });
  
    const handleTransferToPartner = () => {
      const amount = 300; // Simulated input
      if (balance >= amount) {
        setBalance(balance - amount);
        setTransactions([
          { id: Date.now(), date: new Date().toISOString().split('T')[0], description: 'Transferred to Partner', amount: `-₹${amount}` },
          ...transactions
        ]);
      } else {
        alert('Insufficient balance');
      }
    };
 
  return (<>
   <Header />
    <div className="flex">
  <Sidebar />
  <div className="flex-1">
    <div className="p-6">
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Wallet Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-lg font-semibold">Current Balance</h3>
          <p className="text-2xl font-bold text-green-600">₹{balance}</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-lg font-semibold">Total Credits</h3>
          <p className="text-2xl font-bold text-blue-600">₹ {totalcredits}</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h3 className="text-lg font-semibold">Total Debits</h3>
          <p className="text-2xl font-bold text-red-600">₹ {totaldebits} </p>
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <button         onClick={() => setShowAddDialog(true)}
className="bg-white text-blue-800 px-4 py-2 rounded cursor-pointer ">Add Money</button>
        <button  onClick={() => setShowTransferDialog(true)}className="bg-blue-800 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-600">Transfer to Partner</button>
      </div>
      <div className="bg-white shadow rounded-2xl p-4">
        <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            { Array.isArray(transactions) && 
             transactions.length!==0 &&
             transactions.map((item,index)=>{
                return (
                  <tr className="border-t" key={index}>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className={`px-4 py-2  ${
    item.type === 'credit' ? 'text-green-600' : 'text-red-600'
  }`} >{item.amount}</td>
                  <td className="px-4 py-2">Completed</td>
                </tr>
                )
              })
            }
           <TransferToPartnerDialog
             isOpen={showTransferDialog}
             onClose={() => setShowTransferDialog(false)}
         
           />
           <AddMoneyDialog
                   isOpen={showAddDialog}
                   onClose={() => setShowAddDialog(false)} />

            
          
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>

  </div>
    </>
  )
}

export default Wallet;

