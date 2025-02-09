import type { Content } from "@elizaos/core";

export interface GetPriceContent extends Content {
    symbol: string;
    currency: string;
    amount: number;
}

export interface GetOperationContent extends Content {
    symbol: string;
    currency: string;
    operation: string;
    amount: number;
}

export interface GetAnalysisContent extends Content {
    advice: string;
    analysis: string;
}

export interface PriceData {
    price: number;
    marketCap: number;
    volume24h: number;
    percentChange24h: number;
    dataFear: string;
    dataLatestQuotes: string;
    dataLatestNewsCryptocurrency: string;
    dataLatestNewsStocksMarket: string;
}
export interface TokenData {
    amount: number;
    price: number;
    marketCap: number;
    volume24h: number;
    percentChange24h: number;
    dataFear: string;
    dataLatestQuotes: string;
    dataLatestNewsCryptocurrency: string;
    dataLatestNewsStocksMarket: string;
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
