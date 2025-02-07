import axios from "axios";
import type { ApiResponse, PriceData } from "./types";
import { tavily } from "@tavily/core";

const BASE_URL = "https://pro-api.coinmarketcap.com/";
const SEARCH_URL = "https://api.tavily.com/";

export const createPriceService = (apiKey: string, searchApiKey: string) => {
    const clientMarket = axios.create({
        baseURL: BASE_URL,
        headers: {
            "X-CMC_PRO_API_KEY": apiKey,
            Accept: "application/json",
        },
    });

    const clientSearch = axios.create({
        baseURL: SEARCH_URL,
        headers: {
            Authorization: searchApiKey,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    });

    const getPrice = async (
        symbol: string,
        currency: string
    ): Promise<PriceData> => {
        const normalizedSymbol = symbol.toUpperCase().trim();
        const normalizedCurrency = currency.toUpperCase().trim();

        const tavilyClient = tavily({ apiKey: searchApiKey });

        try {
            /*includeAnswer: options?.includeAnswer || true,
                maxResults: options?.limit || 8,
                topic: options?.type || "news",
                searchDepth: options?.searchDepth || "advanced",
                includeImages: options?.includeImages || false,
                days: options?.days || 

            const searchResponse = await clientSearch.get<ApiResponse>(
                "search",
                {
                    params: {
                        query: "Check the latest news about the price of the cryptocurrency " + normalizedSymbol,
                        topic: "news",
                        include_answer: "advanced",
                        search_depth: "advanced",
                        max_results: 8,
                        days: 2
                    },
                }
            );*/
            const searchResponseToken = await tavilyClient.search("Check the latest news about the price of the cryptocurrency " + normalizedSymbol + ". Write a short summary of what is currently happening in the market that could impact the price of the cryptocurrency. DON'T include the date.", {
                includeAnswer: true,
                maxResults: 8,
                topic: "news",
                searchDepth: "advanced",
                includeImages: false,
                days: 2,
            });
            console.log(
                "TP1 searchResponseToken:",
                JSON.stringify(searchResponseToken, null, 2)
            );
            const searchResponseMarket = await tavilyClient.search("Check the latest news about the performance of the U.S. stocks markets. Write a short summary of what is currently happening that could impact the price of the stocks. DON'T include the date.", {
                includeAnswer: true,
                maxResults: 8,
                topic: "news",
                searchDepth: "advanced",
                includeImages: false,
                days: 2,
            });
            console.log(
                "TP1 searchResponseMarket:",
                JSON.stringify(searchResponseMarket, null, 2)
            );

            const response = await clientMarket.get<ApiResponse>(
                "v1/cryptocurrency/quotes/latest",
                {
                    params: {
                        symbol: normalizedSymbol,
                        convert: normalizedCurrency,
                    },
                }
            );
            console.log(
                "TP v1/cryptocurrency/quotes/latest API Response:",
                JSON.stringify(response.data, null, 2)
            );

            //v3/fear-and-greed/latest
            const response2 = await clientMarket.get<ApiResponse>(
                "v3/fear-and-greed/latest",
                {
                    params: {},
                }
            );
            console.log(
                "TP v3/fear-and-greed/latest API Response:",
                JSON.stringify(response2.data, null, 2)
            );

            const symbolData = response.data.data[normalizedSymbol];
            if (!symbolData) {
                throw new Error(
                    `No data found for symbol: ${normalizedSymbol}`
                );
            }

            const quoteData = symbolData.quote[normalizedCurrency];
            if (!quoteData) {
                throw new Error(
                    `No quote data found for currency: ${normalizedCurrency}`
                );
            }

            return {
                price: quoteData.price,
                marketCap: quoteData.market_cap,
                volume24h: quoteData.volume_24h,
                percentChange24h: quoteData.percent_change_24h,
                dataLatestQuotes: JSON.stringify(response.data, null, 2),
                dataFear: JSON.stringify(response2.data, null, 2),
                dataLatestNewsCryptocurrency: JSON.stringify(searchResponseToken, null, 2),
                dataLatestNewsStocksMarket: JSON.stringify(searchResponseMarket, null, 2)
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.status?.error_message ||
                    error.message;
                console.error("API Error:", errorMessage);
                throw new Error(`API Error: ${errorMessage}`);
            }
            throw error;
        }
    };

    return { getPrice };
};
