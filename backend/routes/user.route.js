const express = require("express");
const authController = require("../controllers/auth.controller");

const userRouter = express.Router();

userRouter.post("/register", authController.registerUser);

userRouter.post("/login", authController.loginUser);

// userRouter.get("/logout", )

module.exports = userRouter;