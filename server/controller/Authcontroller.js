import User from "../models/User.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../config/Email.js";


export const signup=async (req,res) => {
    const {name,email,password,role}=req.body;
    try {
      const existUser= await User.findOne({email:email});
      if(existUser){
        return  res.json({message:"user already exist",success:false});
 
       }  
      const verfiyCode=Math.floor(100000+Math.random()*900000).toString();
     

      const hashpassword=await bcrypt.hash(password,10);
      const result=await User.create({
        name:name,
   
        email:email,
        password:hashpassword,
        otp:verfiyCode,
        otpexpires:null,
        role
      })
    
   
      
      const token=jwt.sign({email:result.email,id:result._id},process.env.JWT_SECRET)
      res.status(200).json({
        message:"User Registered Succesfully",
        user:result,
        token:token,
        success:true
      })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong",success:false})
    }
}
export const login=async (req,res) => {
        const {email,password}=req.body;
        console.log(password,email);
     try {
        const existUser=await User.findOne({email:email});
        // console.log(existUser)
        if(!existUser){
          return res.json({ success:false, message:"User not found"})
        }
       
     
            const matchpassword=await bcrypt.compare(password,existUser.password);
        if(!matchpassword){
            return res.json({ success:false,message:"invalid Credentials"});
        }
        const token=jwt.sign({email:existUser.email,id:existUser._id},process.env.JWT_SECRET);
        res.status(200).json({
            user:existUser,
            token:token,
            success:true,
            message:"User Authenticted"
        })
    
     } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"})
     }
}
const sendEmailFun=async(to,subject,text,html)=>{
    const result =await sendEmail(to,subject,text,html);
    if(result.success){
        return true
    }else{
        return false
    }
}
export const forgetpassword=async (req,res) => {
        const {email}=req.body;
        try {
            const verfiyCode=Math.floor(100000+Math.random()*900000).toString();
            let user;
            const existUser= await User.findOne({email:email});
            if(!existUser){
             return   res.json({status:"FAILED",message:"User is not exist"})
            }
            if(existUser){
                existUser.otp=verfiyCode;
                existUser.otpexpires=Date.now()+600000;
                await existUser.save();
           
            }
            const resp=sendEmailFun(email,"Forget Password","", `Dear User,<br><br>
                Your One-Time Password (OTP) for verification is: <b>${verfiyCode}</b><br><br>
                This OTP is valid for <b>5 minutes</b>. Please do not share this code with anyone.<br><br>
                If you did not request this, please ignore this email.<br><br>
                Best regards,<br>
                Olacadamyk`);
            return res.status(200).json({
                success:true,
                status:"success",
                message:"OTP send"
            })
        } catch (error) {
        
            console.log(error)
        }
}
export const verifyotp=async (req,res) => {
      try {
            const {email,otp}=req.body;
            const user=await User.findOne({email:email});
            if(!user){
      return res.status(400).json({success:false,message:"User not Found"});
            }
            const isCodevalid=user.otp===otp;
            const isnotexpired=user.otpexpires>Date.now();
            if(isCodevalid && isnotexpired){
                user.isVerfied=true;
                user.otp=null;
                user.otpexpires=null;
                await user.save();
                return res.status(200).json({success:true,message:"Email is verified Succesfully"})
    
            }else if(!isCodevalid){
                res.json({success:false,message:"invalid otp"})
            }else{
                res.status(400).json({success:false,message:"otp expired"})
            }
        } catch (error) {
            console.log("Error is verifyed",error);
            res.status(500).json({success:false,message:"Error in veryfing email"})
            
        }
}
export const resetpassword=async (req,res) => {
    const {email,newPass}=req.body;
    try {
        const user=await User.findOne({email:email});
        if(!user){
           return  res.status(404).json({message:"User not found" ,success:false})

        }
        const hashpassword=await bcrypt.hash(newPass,10);
        user.password=hashpassword;
        await  user.save();

        return res.status(200).json({message:"Password Updated succesfully",success:true })
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
    }
}