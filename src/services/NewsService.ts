import ArticleData from "../interfaces/ArticleData";

abstract class NewsService {
    constructor(apiKey: string | undefined) {
        if (!apiKey) {
            throw new Error("Api key is not found");
        }
    }

    public abstract getData(): Promise<ArticleData[]>;

    public abstract parseData(data: any): ArticleData[];
}

export default NewsService;
