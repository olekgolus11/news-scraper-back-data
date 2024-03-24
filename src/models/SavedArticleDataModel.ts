import mongoose from "mongoose";
import ArticleData from "../interfaces/ArticleData";

export const SavedArticleDataSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    articleId: String,
    title: String,
    description: String,
    url: String,
    imageUrl: String,
});

interface SavedArticleModelInterface extends ArticleData, mongoose.Document {}

export const SavedArticleDataModel = mongoose.model<SavedArticleModelInterface>("savednews", SavedArticleDataSchema);
