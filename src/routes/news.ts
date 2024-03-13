import { Router } from "express";
import { deleteNews, getSavedNews, saveNews } from "../controllers/newsController";

const newsRouter = Router();

newsRouter.get("/", getSavedNews);
newsRouter.delete("/", deleteNews);
newsRouter.post("/", saveNews);

export default newsRouter;
