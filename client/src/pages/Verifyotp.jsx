import React, { useContext, useRef, useState } from "react";
import { PostData } from "../utils/api";
import { MyContext } from "../App";

const VerifyOTP = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));
const context =useContext(MyContext);
  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    // Move focus
    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0 && !otp[index]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d{6}$/.test(pasteData)) return;

    const pasteArray = pasteData.split("");
    setOtp(pasteArray);

    pasteArray.forEach((digit, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = digit;
      }
    });

    if (inputRefs.current[5]) inputRefs.current[5].focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");
    console.log("Submitted OTP:", enteredOTP);
    const email=localStorage.getItem("Email");
    PostData("/api/auth/verifyotp",{email,otp}).then((res)=>{
      if(res.success===true){
        context.setalertbox({
          msg:res.message,
          error:false,
          open:true
        })
     localStorage.setItem("Email",email);
    history("/resetpassword");   
    
      }else{
        context.setalertbox({
          msg:res.message,
          error:true,
          open:true
        })
      }
    }).catch(err=>console.log(err))
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-100 max-w-md text-center"
      >
        <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>
        <p className="mb-4 text-gray-600">Enter the 6-digit OTP sent to your phone/email.</p>

        <div className="flex justify-between mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border rounded text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Didn't get the OTP?{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );
};

export default VerifyOTP;
