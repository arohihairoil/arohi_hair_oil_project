import express from "express";
import { adminLogin, getUserProfile } from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

/* ADMIN */
userRouter.post("/admin", adminLogin);

/* PROFILE (ADMIN OR USER – if needed later) */
userRouter.get("/profile", adminAuth, getUserProfile);

export default userRouter;
