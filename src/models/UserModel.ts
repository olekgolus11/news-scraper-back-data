import mongoose from "mongoose";
import UserData from "../interfaces/UserData";

export const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
});

interface UserModelInterface extends UserData, mongoose.Document {}

export const UserModel = mongoose.model<UserModelInterface>("users", UserSchema);
