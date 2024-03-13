import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import getDbService from "../utils/getDbService";
import ArticleData from "../interfaces/ArticleData";

export const getSavedNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dbService = getDbService();
        const data = await dbService.getSavedArticles();

        res.status(StatusCodes.OK).send(data);
    } catch (error: any) {
        next(error);
    }
};

export const saveNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const articleData = req.body as ArticleData;

        const dbService = getDbService();
        const statusCode = await dbService.addToSavedArticles(articleData);

        res.status(statusCode).send("News saved to database");
    } catch (error: any) {
        next(error);
    }
};

export const deleteNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = req.query as any;
        const { articleId }: { articleId: string } = queryParams;

        const dbService = getDbService();
        await dbService.removeFromSavedArticles(articleId);

        res.status(StatusCodes.OK).send("News deleted from database");
    } catch (error: any) {
        next(error);
    }
};
