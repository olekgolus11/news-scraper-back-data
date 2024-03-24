import express from "express";
import newsRouter from "./routes/news";
import errorHandler from "./middlewares/errorHandler";
import { appPort } from "./utils/environments";
import connectToDb from "./utils/connectToDb";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";

const app = express();

(async () => {
    await connectToDb();
})();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/news", newsRouter);
app.use("/user", userRouter);
app.use(errorHandler);

app.listen(appPort, () => console.info(`⚡ Server is running on port ${appPort}`));
