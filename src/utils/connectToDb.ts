import mongoose from "mongoose";
import { dbUrl, dbUser, dbPassword } from "./environments";

const connectToDb = async () => {
    try {
        await mongoose.connect(dbUrl, {
            auth: {
                username: dbUser,
                password: dbPassword,
            },
        });
        console.info("🗄️  Connected to database");
    } catch (error: any) {
        console.error("Error connecting to database", error);
    }
};

export default connectToDb;
