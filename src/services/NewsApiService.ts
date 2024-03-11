import ArticleData from "../interfaces/ArticleData";
import { NewsApiResponse } from "../interfaces/NewsApiResponse";
import NewsService from "./NewsService";
const NewsAPI = require("newsapi");
import { Md5 } from "ts-md5";

class NewsApiService extends NewsService {
    private apiKey: string;
    private newsAPIClient: any;

    constructor(apiKey: string) {
        super(apiKey);
        this.apiKey = apiKey;
        this.newsAPIClient = new NewsAPI(apiKey);
    }

    public async getData(): Promise<ArticleData[]> {
        const data: NewsApiResponse = await this.newsAPIClient.v2.topHeadlines({
            sources: "bbc-news,the-verge",
        });

        const parsedData = this.parseData(data);
        return parsedData;
    }

    public parseData(data: NewsApiResponse): ArticleData[] {
        const articles: ArticleData[] = data.articles.map((article) => {
            return {
                articleId: Md5.hashStr(article.title + article.url).toString(),
                title: article.title,
                description: article.description,
                url: article.url,
                imageUrl: article.urlToImage,
            };
        });
        const filteredArticles = articles.filter((article) => article.imageUrl !== null && article.description !== null);
        return filteredArticles;
    }
}

export default NewsApiService;
