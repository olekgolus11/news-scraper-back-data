import { StatusCodes } from "http-status-codes";
import ArticleData from "../interfaces/ArticleData";
import { SavedArticleDataModel } from "../models/SavedArticleDataModel";
import DbService from "./DbService";

class MongoDbService extends DbService {
    public async getSavedArticles(): Promise<ArticleData[]> {
        const savedArticles = await SavedArticleDataModel.find({});
        return savedArticles;
    }

    public async addToSavedArticles(articleData: ArticleData): Promise<StatusCodes> {
        const article = await SavedArticleDataModel.findOne({ articleId: articleData.articleId }).exec();
        if (article) {
            return StatusCodes.CONFLICT;
        }

        await SavedArticleDataModel.create({
            articleId: articleData.articleId,
            title: articleData.title,
            description: articleData.description,
            url: articleData.url,
            imageUrl: articleData.imageUrl,
        });
        return StatusCodes.CREATED;
    }

    public async removeFromSavedArticles(articleId: string): Promise<void> {
        await SavedArticleDataModel.deleteOne({ articleId: articleId }).exec();
    }
}

export default MongoDbService;
