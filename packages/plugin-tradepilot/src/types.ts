import type { Content } from "@elizaos/core";

export interface GetPriceContent extends Content {
    symbol: string;
    currency: string;
}

export interface PriceData {
    price: number;
    marketCap: number;
    volume24h: number;
    percentChange24h: number;
}

export interface SwapInquiry {
    tokenFrom: string,
    tokenTo: string,
    amount: number,
}

export interface ApiResponse {
    data: {
        [symbol: string]: {
            quote: {
                [currency: string]: {
                    price: number;
                    market_cap: number;
                    volume_24h: number;
                    percent_change_24h: number;
                };
            };
        };
    };
}

export type SearchResult = {
    title: string;
    url: string;
    content: string;
    rawContent?: string;
    score: number;
    publishedDate?: string;
};

export type SearchImage = {
    url: string;
    description?: string;
};

export type SearchResponse = {
    answer?: string;
    query: string;
    responseTime: number;
    images: SearchImage[];
    results: SearchResult[];
};

export interface SearchOptions {
    limit?: number;
    type?: "news" | "general";
    includeAnswer?: boolean;
    searchDepth?: "basic" | "advanced";
    includeImages?: boolean;
    days?: number; // 1 means current day, 2 means last 2 days
}
