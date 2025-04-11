import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostData } from "../utils/api";
import { MyContext } from "../App";

const Signup = () => {
  const history=useNavigate();
  const context=useContext(MyContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      context.setalertbox({
        msg:"passworrd doesnt match",
        error:true,
        open:true
      })
      return;
    }

    console.log("Signing up with:", { name, email, password });
   PostData("/api/auth/signup",{name,email,password}).then((res)=>{
    if(res.success===true){
      context.setalertbox({
        msg:res.message,
        error:false,
        open:true
      })
      history("/login");
    }else{
      context.setalertbox({
        msg:res.message,
        error:true,
        open:true
      })
    }
   }).catch((err)=>{
console.log(err)
context.setalertbox({
  msg:"something wnet wrong please try again",
  error:false,
  open:true
})
   })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-90 max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Name</label>
          <input
          placeholder="Enter your Name"
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
          placeholder="Enter your Email"
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
          placeholder="Enter your password"
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Confirm Password</label>
          <input
          placeholder="Confirm the password"
            type="password"
            name="confirmPassword"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 cursor-pointer rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
