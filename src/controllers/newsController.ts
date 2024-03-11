import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import getNewsService from "../utils/getNewsService";
import ApiType from "../interfaces/ApiType";
import getDbService from "../utils/getDbService";

export const getNews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = req.query as any;
        const { newsApiService }: { newsApiService: ApiType } = queryParams;
        console.info("Getting news from:", newsApiService);

        const newsService = getNewsService(newsApiService);
        const dbService = getDbService();
        const data = await newsService.getData();
        await dbService.addFetchedArticlesToAllArticlesCollection(data);

        res.status(StatusCodes.OK).send(data);
    } catch (error: any) {
        next(error);
    }
};

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
        const queryParams = req.query as any;
        const { articleId }: { articleId: string } = queryParams;

        const dbService = getDbService();
        await dbService.addToSavedArticles(articleId);

        res.status(StatusCodes.CREATED).send("News saved to database");
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
