export interface NewsDataIoResponse {
    status: string;
    totalResults: number;
    results: NewsDataIoArticle[];
}

export interface NewsDataIoArticle {
    article_id: string;
    title: string;
    link: string;
    keywords: any;
    creator: any;
    video_url: any;
    description: any;
    content: string;
    pubDate: string;
    image_url: string;
    source_id: string;
    source_url: string;
    source_icon: string;
    source_priority: number;
    country: string[];
    category: string[];
    language: string;
    ai_tag: string[];
    ai_region: any;
    sentiment: string;
    sentiment_stats: SentimentStats;
}

export interface SentimentStats {
    positive: number;
    neutral: number;
    negative: number;
}
