import { StatusCodes } from "http-status-codes";
import ArticleData from "../interfaces/ArticleData";

abstract class DbService {
    constructor() {
        if (!process.env.DB_URL) {
            throw new Error("Database URL is not found");
        }
    }

    public abstract getSavedArticles(): Promise<ArticleData[]>;

    public abstract addToSavedArticles(articleData: ArticleData): Promise<StatusCodes>;

    public abstract removeFromSavedArticles(articleId: string): Promise<void>;
}

export default DbService;
