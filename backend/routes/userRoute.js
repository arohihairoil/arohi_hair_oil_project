// import express from 'express';
// import { adminLogin } from '../controllers/userController';
// // import {
// //   loginUser,
// //   registerUser,
// //   adminLogin,
// //   forgotPassword,
// //   getUserProfile,
// // } from "../controllers/userController.js";
// import authUser from "../middleware/auth.js";

// const userRouter = express.Router();

// // userRouter.post("/register", registerUser);
// // userRouter.post("/login", loginUser);
// userRouter.post("/admin",authUser, adminLogin);
// // userRouter.post("/forgot-password", forgotPassword);
// // userRouter.get("/profile", authUser, getUserProfile);

// export default userRouter;

import express from "express";
import { adminLogin, getUserProfile } from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

/* ADMIN */
userRouter.post("/admin", adminLogin);

/* PROFILE (ADMIN OR USER – if needed later) */
userRouter.get("/profile", adminAuth, getUserProfile);

export default userRouter;
