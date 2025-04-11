import express from "express";

import { forgetpassword, login, resetpassword, signup, verifyotp } from "../controller/Authcontroller.js";

const router=express.Router();



router.post("/signup",signup);
router.post("/login",login);
router.post("/forgetpassword",forgetpassword);
router.post("/verifyotp",verifyotp);
router.post("/resetpassword",resetpassword);

export default router;