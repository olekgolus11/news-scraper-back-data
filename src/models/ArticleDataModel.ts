import mongoose from "mongoose";

export const ArticleDataSchema = new mongoose.Schema({
    articleId: String,
    title: String,
    description: String,
    url: String,
    imageUrl: String,
});

export const ArticleDataModel = mongoose.model("news", ArticleDataSchema);
