const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  verifyOtp,
  resendOtp,
} = require("../controller/userController");

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logOutUser);
userRouter.route("/verify/otp").post(verifyOtp);
userRouter.route("/resend/otp").post(resendOtp);

module.exports = userRouter;
