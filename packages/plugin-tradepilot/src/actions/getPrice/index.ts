import {
    composeContext,
    elizaLogger,
    generateObjectDeprecated,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type State,
    type Action,
} from "@elizaos/core";
import { validateCoinMarketCapConfig } from "../../environment";
import { priceExamples } from "./examples";
import { createPriceService } from "./service";
import { getAnalysisTemplate, getPriceTemplate } from "./template";
import type { GetAnalysisContent, GetPriceContent } from "./types";
import { isGetPriceContent } from "./validation";

export default {
    name: "GET_PRICE",
    similes: [
        "CHECK_PRICE",
        "PRICE_CHECK",
        "GET_CRYPTO_PRICE",
        "CHECK_CRYPTO_PRICE",
        "GET_TOKEN_PRICE",
        "CHECK_TOKEN_PRICE",
    ],
    // eslint-disable-next-line
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateCoinMarketCapConfig(runtime);
        return true;
    },
    description: "Get the current price of a cryptocurrency from CoinMarketCap",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.log("Starting CoinMarketCap GET_PRICE handler...");

        // Initialize or update state
        // Initialize or update state
        let currentState = state;
        if (!currentState) {
            currentState = (await runtime.composeState(message)) as State;
        } else {
            currentState = await runtime.updateRecentMessageState(currentState);
        }

        try {
            // Compose and generate price check content
            const priceContext = composeContext({
                state: currentState,
                template: getPriceTemplate,
            });
            const content = (await generateObjectDeprecated({
                runtime,
                context: priceContext,
                modelClass: ModelClass.SMALL,
            })) as unknown as GetPriceContent;

            // Validate content
            if (!isGetPriceContent(content)) {
                throw new Error("Invalid price check content");
            }

            // Get price from CoinMarketCap
            const config = await validateCoinMarketCapConfig(runtime);
            const tavilyApiKey = runtime.getSetting("TAVILY_API_KEY") as string;

            const priceService = createPriceService(
                config.COINMARKETCAP_API_KEY,
                tavilyApiKey
            );

            try {

                /*const apiKey = _runtime.getSetting("TAVILY_API_KEY") as string;
                    if (!apiKey) {
                        throw new Error("TAVILY_API_KEY is not set");
                    }
                    this.tavilyClient = tavily({ apiKey });

                    let webSearchPrompt = "";
                
                    const response = await this.tavilyClient.search(webSearchPrompt + ". Based on the sentiment of the news give a buy, sell, or hold advice for the token, with a short summary of what is currently happening in the market that justifies the advice you are giving. The response must be just the advice and short summary. Don't include the price.", {
                        includeAnswer: options?.includeAnswer || true,
                        maxResults: options?.limit || 8,
                        topic: options?.type || "news",
                        searchDepth: options?.searchDepth || "advanced",
                        includeImages: options?.includeImages || false,
                        days: options?.days || 2,
                    });

                if (searchResponse && searchResponse.results.length) {
                    const responseList = searchResponse.answer
                        ? `${searchResponse.answer}${Array.isArray(searchResponse.results) &&
                            searchResponse.results.length > 0
                            ? `\n\nFor more details, you can check out these resources:\n${searchResponse.results
                                .map(
                                    (result: SearchResult, index: number) =>
                                        `${index + 1}. [${result.title}](${result.url})`
                                )
                                .join("\n")}`
                            : ""
                        }`
                        : "";
                } else {
                    elizaLogger.error("search failed or returned no data.");
                }*/

                const priceData = await priceService.getPrice(
                    content.symbol,
                    content.currency
                );

                /*console.log(
                    "TP1 GET_PRICE handler priceData?",priceData
                );

                console.log(
                    "TP1 GET_PRICE handler priceData.dataFear:",priceData.dataFear
                );
                console.log(
                    "TP1 GET_PRICE handler priceData.dataLatestQuotes:",priceData.dataLatestQuotes
                );*/


                // Compose and generate market analysis content
                const analysisContext = composeContext({
                    state: {
                        dataFear: priceData.dataFear,
                        dataLatestQuotes: priceData.dataLatestQuotes,
                        dataLatestNewsCryptocurrency: priceData.dataLatestNewsCryptocurrency,
                        dataLatestNewsStocksMarket: priceData.dataLatestNewsStocksMarket,
                        bio: "",
                        lore: "",
                        messageDirections: "",
                        postDirections: "",
                        roomId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                        actors: "",
                        recentMessages: "",
                        recentMessagesData: []
                    },
                    template: getAnalysisTemplate,
                });
                const analysisContent = (await generateObjectDeprecated({
                    runtime,
                    context: analysisContext,
                    modelClass: ModelClass.SMALL,
                })) as unknown as GetAnalysisContent;
                console.log("TP1 analysisContent:", analysisContent);

                elizaLogger.success(
                    `Price retrieved successfully! ${content.symbol}: ${priceData.price} ${content.currency.toUpperCase()}`
                );

                if (callback) {
                    callback({
                        //text: `The current price of ${content.symbol} is ${priceData.price} ${content.currency.toUpperCase()}`,
                        text: `The current price of ${content.symbol} is ${priceData.price} ${content.currency.toUpperCase()}. TradePilot thinks that it would be wise to ${analysisContent.advice}: ${analysisContent.analysis}`,
                        content: {
                            symbol: content.symbol,
                            currency: content.currency,
                            ...priceData,
                        },
                    });
                }

                return true;
            } catch (error) {
                console.error("2 Error in GET_PRICE handler:", error);
                elizaLogger.error("2 Error in GET_PRICE handler:", error);
                if (callback) {
                    callback({
                        text: `2 Error fetching price: ${error.message}`,
                        content: { error: error.message },
                    });
                }
                return false;
            }
        } catch (error) {
            console.error("1 Error in GET_PRICE handler:", error);
            elizaLogger.error("1 Error in GET_PRICE handler:", error);
            if (callback) {
                callback({
                    text: `1 Error fetching price: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    examples: priceExamples,
} as Action;
