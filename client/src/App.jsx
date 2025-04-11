import { createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/dashboard';
import Wallet from './pages/Wallet';
import Notification from './pages/Notifications';
import Orders from './pages/Orders';
import PickupPartner from './pages/Pickuppartner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyOTP from './pages/Verifyotp';
import ResetPassword from './pages/Resetpassword';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import { fetchDataFromApi } from './utils/api';
import ThemeToggle from './utils/Theme';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './components/protectedroute';
const MyContext=createContext();
function App() {
  const [totalbalance,settotalbalance]=useState(0)
  const [Pickuppartner,setpickuppartner]=useState([])
  const [walletdetails,setwalletdetails]=useState([]);
  const [order,setorder]=useState([])
  useEffect(() => {
    setTimeout(() => {
      fetchDataFromApi("/api/wallet/summary").then((res)=>{
        setwalletdetails(res)
      settotalbalance(res.balance)
      }).catch(err=>console.log(err))
        
        fetchDataFromApi("/api/partners").then((res)=>{
         setpickuppartner(res)
        }).catch(err=>console.log(err))
      fetchDataFromApi("/api/orders/").then((res)=>{
        setorder(res)
      })
    }, 1000);

  });

  
  const [alertbox,setalertbox]=useState({
    msg:"please fill",
    error:false,
    open:false
  });
  const handleclose=(event,reason)=>{
    if(reason==="clickaway"){
      return ;
    }
    setalertbox({
      open:false
    });
  }
const value={
  alertbox,
  setalertbox,
  totalbalance,
  settotalbalance,
  order,
  setorder,
  Pickuppartner,
  setpickuppartner,
  walletdetails,setwalletdetails
}

  return (
    <>
    <MyContext.Provider value={value} >
    <Snackbar open={alertbox.open} autoHideDuration={6000} oncClose={handleclose}  >
      <Alert onClose={handleclose} severity={alertbox.error===false?"success":"error"}
      variant="filled" sx={{width:"100%"}} >
     {alertbox.msg} 
      </Alert>

    </Snackbar>
    <ToastContainer position="top-right" autoClose={4000} />
    <Router>
  
      <Routes>
        <Route path="/" element={<ProtectedRoute >
          <Dashboard/>
        </ProtectedRoute>
       } />
        <Route path="/wallet" element={<ProtectedRoute >
          <Wallet />
        </ProtectedRoute>
        } />
        <Route path="/notifications" element={ <ProtectedRoute >
          <Notification/>
        </ProtectedRoute>
         } />
        <Route path="/orders" element={
          <ProtectedRoute >
            <Orders/>
            </ProtectedRoute>} />
        <Route path="/pickup-partners" element={ <ProtectedRoute >
          <PickupPartner/>
        </ProtectedRoute>
     } />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>

    </Router>
    </MyContext.Provider>
  

    </>
  )
}
export { MyContext};
export default App
