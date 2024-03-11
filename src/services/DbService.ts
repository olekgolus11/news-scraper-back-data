import ArticleData from "../interfaces/ArticleData";

abstract class DbService {
    constructor() {
        if (!process.env.DB_URL) {
            throw new Error("Database URL is not found");
        }
    }

    public abstract getSavedArticles(): Promise<ArticleData[]>;

    public abstract addToSavedArticles(articleId: string): Promise<void>;

    public abstract removeFromSavedArticles(articleId: string): Promise<void>;

    public abstract addFetchedArticlesToAllArticlesCollection(articles: ArticleData[]): Promise<void>;
}

export default DbService;
