require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ! import router
const userRouter = require("../routes/userRoutes");
app.use("/api/v1", userRouter);
app.listen(port, (req, res) => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app };
