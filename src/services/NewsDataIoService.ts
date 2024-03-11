import axios from "axios";
import NewsService from "./NewsService";
import ArticleData from "../interfaces/ArticleData";
import { NewsDataIoResponse } from "../interfaces/NewsDataIoResponse";
import { Md5 } from "ts-md5";

class NewsDataIoService extends NewsService {
    private apiKey: string;

    constructor(apiKey: string) {
        super(apiKey);
        this.apiKey = apiKey;
    }

    public async getData(): Promise<ArticleData[]> {
        const { data } = await axios.get<NewsDataIoResponse>("https://newsdata.io/api/1/news", {
            params: {
                apiKey: this.apiKey,
                language: "en",
            },
        });

        const parsedData = this.parseData(data);
        return parsedData;
    }

    public parseData(data: NewsDataIoResponse): ArticleData[] {
        const articles: ArticleData[] = data.results.map((article: any) => {
            return {
                articleId: Md5.hashStr(article.title + article.link).toString(),
                title: article.title,
                description: article.description,
                url: article.link,
                imageUrl: article.image_url,
            };
        });
        const filteredArticles = articles.filter((article) => article.imageUrl !== null && article.description !== null);
        return filteredArticles;
    }
}

export default NewsDataIoService;
