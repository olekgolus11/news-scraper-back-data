import { StatusCodes } from "http-status-codes";
import ArticleData from "../interfaces/ArticleData";
import UserData from "../interfaces/UserData";
import { ObjectId } from "mongoose";

abstract class DbService {
    constructor() {
        if (!process.env.DB_URL) {
            throw new Error("Database URL is not found");
        }
    }

    public abstract getSavedArticles(token: string): Promise<ArticleData[]>;

    public abstract addToSavedArticles(articleData: ArticleData, token: string): Promise<StatusCodes>;

    public abstract removeFromSavedArticles(articleId: string, token: string): Promise<void>;

    public abstract addUser(userData: any): Promise<StatusCodes>;

    public abstract authenticateUser(userData: any): Promise<ObjectId>;
}

export default DbService;
