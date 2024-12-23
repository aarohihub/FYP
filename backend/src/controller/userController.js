const User = require("../model/UserSchema");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const sendOtp = require("../utils/SendOtp");
const generateOtpEmail = require("../utils/Emailformat");
const sendToken = require("../utils/JwkToken");

// ! user register controller
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return next(new ErrorHandler(401, "user already registered"));
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpire = new Date();
  otpExpire.setMinutes(otpExpire.getMinutes() + 10);
  let message = generateOtpEmail(firstName, lastName, otp);
  try {
    await sendOtp({
      email: email,
      subject: "Your OTP is here",
      message,
    });
  } catch (error) {
    console.log("sendOtp error: " + error);
    return next(new ErrorHandler(500, "Failed to send OTP"));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    otp,
    otpExpire,
  });
  user.password = undefined;
  sendToken(user, 201, res);
});

// ? Verify user Otp
exports.verifyOtp = asyncHandler(async (req, res, next) => {
  const { otp } = req.body;

  const user = await User.findOne({ otp });

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  if (!user.otp || user.otp !== otp) {
    return next(new ErrorHandler(400, "Invalid OTP"));
  }
  const currentTime = new Date();
  if (currentTime > user.otpExpire) {
    return next(
      new ErrorHandler(400, "OTP has expired. Please request a new one.")
    );
  }
  user.isVerified = true;
  user.otp = null;
  user.otpExpire = null;
  await user.save();
  res.status(200).json({
    success: true,
    message: "OTP verified successfully. You are now verified!",
  });
});

// ? Resend Otp controller
exports.resendOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpire = new Date();
  otpExpire.setMinutes(otpExpire.getMinutes() + 10);

  user.otp = otp;
  user.otpExpire = otpExpire;
  await user.save();

  let message = generateOtpEmail(user.firstName, user.lastName, otp);

  try {
    await sendOtp({
      email: user.email,
      subject: "Your New OTP",
      message,
    });
  } catch (error) {
    console.log("sendOtp error: " + error);
    return next(new ErrorHandler(500, "Failed to send OTP"));
  }

  res.status(200).json({
    success: true,
    message: "A new OTP has been sent to your email.",
  });
});

// ? login user controller
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler(400, "Please enter a valid email and password")
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler(401, "Invalid password"));
  }

  sendToken(user, 200, res);
});

// ? Logout user controller

exports.logOutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", null, {
    expire: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    sucess: true,
    message: "User logged out",
  });
});
