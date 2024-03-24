import { StatusCodes } from "http-status-codes";
import ArticleData from "../interfaces/ArticleData";
import { SavedArticleDataModel } from "../models/SavedArticleDataModel";
import DbService from "./DbService";
import { UserModel } from "../models/UserModel";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/environments";

class MongoDbService extends DbService {
    public async getSavedArticles(token: string): Promise<ArticleData[]> {
        const { userId } = jwt.verify(token, jwtSecret) as { userId: ObjectId };
        const savedArticles = await SavedArticleDataModel.find({ userId: userId }).exec();
        return savedArticles;
    }

    public async addToSavedArticles(articleData: ArticleData, token: string): Promise<StatusCodes> {
        const { userId } = jwt.verify(token, jwtSecret) as { userId: ObjectId };
        const article = await SavedArticleDataModel.findOne({ articleId: articleData.articleId, userId: userId }).exec();

        if (article) {
            return StatusCodes.CONFLICT;
        }

        await SavedArticleDataModel.create({
            userId: userId,
            articleId: articleData.articleId,
            title: articleData.title,
            description: articleData.description,
            url: articleData.url,
            imageUrl: articleData.imageUrl,
        });
        return StatusCodes.CREATED;
    }

    public async removeFromSavedArticles(articleId: string, token: string): Promise<void> {
        const { userId } = jwt.verify(token, jwtSecret) as { userId: ObjectId };
        await SavedArticleDataModel.deleteOne({ articleId: articleId, userId: userId }).exec();
    }

    public async addUser(userData: any): Promise<StatusCodes> {
        const user = await UserModel.findOne({ username: userData.username }).exec();
        if (user) {
            return StatusCodes.CONFLICT;
        }

        await UserModel.create({
            username: userData.username,
            email: userData.email,
            password: userData.password,
        });

        return StatusCodes.CREATED;
    }

    public async authenticateUser(userData: any): Promise<ObjectId> {
        const user = await UserModel.findOne({ username: userData.username, password: userData.password }).exec();
        if (!user) {
            throw new Error("User not found");
        }

        return user._id;
    }
}

export default MongoDbService;
