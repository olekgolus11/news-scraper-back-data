import NewsService from "../services/NewsService";
import NewsApiService from "../services/NewsApiService";
import NewsDataIoService from "../services/NewsDataIoService";
import ApiType from "../interfaces/ApiType";

interface ClassDefinition {
    serviceClass: NewsService;
    apiKey: string;
}

const newsServices: Map<string, ClassDefinition> = new Map<ApiType, any>([
    [
        "newsApi",
        {
            serviceClass: NewsApiService,
            apiKey: process.env.NEWS_API_KEY,
        },
    ],
    [
        "newsDataIo",
        {
            serviceClass: NewsDataIoService,
            apiKey: process.env.NEWS_DATA_IO_KEY,
        },
    ],
]);

const getNewsService = (newsApiType: ApiType): NewsService => {
    const loadedService = newsServices.get(newsApiType);
    if (!loadedService) {
        throw new Error("Invalid service requested");
    }
    const { serviceClass, apiKey } = loadedService;
    if (!serviceClass || !apiKey) {
        throw new Error(`Service class ${newsApiType} with api key ${apiKey} loaded not correctly`);
    }

    return new (serviceClass as any)(apiKey);
};

export default getNewsService;
