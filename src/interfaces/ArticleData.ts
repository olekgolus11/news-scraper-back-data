import mongoose from "mongoose";

interface ArticleData {
    userId: mongoose.Types.ObjectId;
    articleId: string;
    title: string;
    description: string;
    url: string;
    imageUrl: string;
}

export default ArticleData;
