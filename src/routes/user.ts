import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/register", signUpUser);
userRouter.post("/login", signInUser);

export default userRouter;
