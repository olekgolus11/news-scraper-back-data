import mongoose from "mongoose";
import ArticleData from "../interfaces/ArticleData";

export const SavedArticleDataSchema = new mongoose.Schema({
    articleId: String,
    title: String,
    description: String,
    url: String,
    imageUrl: String,
    isSaved: Boolean,
});

interface SavedArticleModelInterface extends ArticleData, mongoose.Document {}

export const SavedArticleDataModel = mongoose.model<SavedArticleModelInterface>("savednews", SavedArticleDataSchema);
