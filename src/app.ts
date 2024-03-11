import express from "express";
import newsRouter from "./routes/news";
import errorHandler from "./middlewares/errorHandler";
import { appPort } from "./utils/environments";
import connectToDb from "./utils/connectToDb";
import cors from "cors";

const app = express();

(async () => {
    await connectToDb();
})();

app.use(cors());
app.use("/news", newsRouter);
app.use(errorHandler);

app.listen(appPort, () => console.info(`⚡ Server is running on port ${appPort}`));
