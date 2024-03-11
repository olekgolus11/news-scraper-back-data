export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: NewsApiArticle[];
}

export interface NewsApiArticle {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface Source {
    id: string;
    name: string;
}
