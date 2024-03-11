import ArticleData from "../interfaces/ArticleData";
import { ArticleDataModel } from "../models/ArticleDataModel";
import { SavedArticleDataModel } from "../models/SavedArticleDataModel";
import DbService from "./DbService";
import mongoose from "mongoose";
class MongoDbService extends DbService {
    public async getSavedArticles(): Promise<ArticleData[]> {
        const savedArticles = await SavedArticleDataModel.find({});
        return savedArticles;
    }

    public async addToSavedArticles(articleId: string): Promise<void> {
        const article = await ArticleDataModel.findOne({ articleId: articleId });
        if (!article) {
            throw new Error("Article not found");
        }
        await SavedArticleDataModel.create({
            articleId: article.articleId,
            title: article.title,
            description: article.description,
            url: article.url,
            imageUrl: article.imageUrl,
        });
    }

    public async removeFromSavedArticles(articleId: string): Promise<void> {
        await SavedArticleDataModel.deleteOne({ articleId: articleId }).exec();
    }

    public async addFetchedArticlesToAllArticlesCollection(articles: ArticleData[]): Promise<void> {
        const bulkOps = articles.map((article) => {
            return {
                updateOne: {
                    filter: { articleId: article.articleId },
                    update: { $set: article },
                    upsert: true,
                },
            };
        });

        await ArticleDataModel.bulkWrite(bulkOps);
    }
}

export default MongoDbService;
