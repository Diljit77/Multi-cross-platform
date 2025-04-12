import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Make sure you have react-router-dom installed
import { PostData } from "../utils/api";
import { MyContext } from "../App";


const Login = () => {
  const [email, setEmail] = useState("");
  const history=useNavigate();
  const context=useContext(MyContext);
  const forgetpassword=(e)=>{
    e.preventDefault();
    if(email===""){
      context.setalertbox({
        msg:"please fill the email ",
        error:true,
        open:true
      })
    }
PostData("/api/auth//forgetpassword",{email}).then((res)=>{
  if(res.success===true){
    context.setalertbox({
      msg:res.message,
      error:false,
      open:true
    })
 localStorage.setItem("Email",email);
history("/verifyotp");   

  }else{
    context.setalertbox({
      msg:res.message,
      error:true,
      open:true
    })
  }
})
  }
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  PostData("/api/auth/login",{email,password
  }).then((res)=>{
    if(res.success===true){
      context.setalertbox({
        msg:res.message,
        error:false,
        open:true
      })
   localStorage.setItem("token",res.token);
history("/")   

    }else{
      context.setalertbox({
        msg:res.message,
        error:true,
        open:true
      })
    }
  })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-90 max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
          placeholder="Enter your password"
            type="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-right mb-4">
          <Link to="/verifyotp" onClick={(e)=>forgetpassword(e)} className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};



export default Login;
