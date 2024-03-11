import { Router } from "express";
import { deleteNews, getNews, getSavedNews, saveNews } from "../controllers/newsController";

const newsRouter = Router();

newsRouter.get("/", getNews);
newsRouter.get("/saved", getSavedNews);
newsRouter.delete("/", deleteNews);
newsRouter.post("/", saveNews);

export default newsRouter;
