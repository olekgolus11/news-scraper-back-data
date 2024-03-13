import mongoose from "mongoose";
import { dbUrl } from "./environments";

const connectToDb = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.info("🗄️  Connected to database");
    } catch (error: any) {
        console.error("Error connecting to database", error);
    }
};

export default connectToDb;
