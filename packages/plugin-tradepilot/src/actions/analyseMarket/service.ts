import axios from "axios";
import type { ApiResponse, PriceData, TokenData } from "./types";
import { tavily } from "@tavily/core";

const BASE_URL = "https://pro-api.coinmarketcap.com/";
const SEARCH_URL = "https://api.tavily.com/";

export const createAnalysisService = (apiKey: string, searchApiKey: string) => {
    const clientMarket = axios.create({
        baseURL: BASE_URL,
        headers: {
            "X-CMC_PRO_API_KEY": apiKey,
            Accept: "application/json",
        },
    });

    const analyseMarket = async (
        symbol: string,
        currency: string,
        amount: number,
    ): Promise<TokenData> => {
        const normalizedSymbol = symbol.toUpperCase().trim();
        const normalizedCurrency = currency.toUpperCase().trim();

        const tavilyClient = tavily({ apiKey: searchApiKey });

        try {
            //Get latest news about the token and the market
            const searchResponseToken = await tavilyClient.search("Check the latest news about the price of the cryptocurrency " + normalizedSymbol + ". Write a short summary of what is currently happening in the market that could impact the price of the cryptocurrency. DON'T include the date.", {
                includeAnswer: true,
                maxResults: 8,
                topic: "news",
                searchDepth: "advanced",
                includeImages: false,
                days: 2,
            });
            //console.log("TP2 searchResponseToken:",JSON.stringify(searchResponseToken, null, 2));
            const searchResponseMarket = await tavilyClient.search("Check the latest news about the performance of the U.S. stocks markets. Write a short summary of what is currently happening that could impact the price of the stocks. DON'T include the date.", {
                includeAnswer: true,
                maxResults: 8,
                topic: "news",
                searchDepth: "advanced",
                includeImages: false,
                days: 2,
            });
            //console.log("TP2 searchResponseMarket:",JSON.stringify(searchResponseMarket, null, 2));

            //Get the token price details
            const response = await clientMarket.get<ApiResponse>(
                "v1/cryptocurrency/quotes/latest",
                {
                    params: {
                        symbol: normalizedSymbol,
                        convert: normalizedCurrency,
                    },
                }
            );
            //console.log("TP2 v1/cryptocurrency/quotes/latest API Response:",JSON.stringify(response.data, null, 2));

            //Check latest fear and greed index
            const response2 = await clientMarket.get<ApiResponse>(
                "v3/fear-and-greed/latest",
                {
                    params: {},
                }
            );
            console.log("TP2 v3/fear-and-greed/latest API Response:",JSON.stringify(response2.data, null, 2));

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
                amount: amount,
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

    return { analyseMarket };
};
