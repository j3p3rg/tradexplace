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
    MemoryManager,
} from "@elizaos/core";
import { validateCoinMarketCapConfig } from "../../environment";
import { operationExamples, priceExamples } from "./examples";
import { createAnalysisService } from "./service";
import { getAnalysisTemplate, getOperationTemplate, getPriceTemplate } from "./template";
import type { GetAnalysisContent, GetOperationContent, GetPriceContent } from "./types";
import { isGetOperationContent, isGetPriceContent } from "./validation";
import { TP_MEMORY } from "../../constants";
import { SwapInquiry } from "../../types";

export default {
    name: "BUY_SELL",
    similes: [
        "BUY_TOKEN",
        "SELL_TOKEN",
        "PURCHASE_TOKEN",
        "CONVERT_TOKEN",
    ],
    // eslint-disable-next-line
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateCoinMarketCapConfig(runtime);
        return true;
    },
    description: "Get the information of a cryptocurrency from CoinMarketCap, including price, market details, and news",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.log("Starting TP BUY_SELL handler...");

        // Initialize or update state
        // Initialize or update state
        let currentState = state;
        if (!currentState) {
            currentState = (await runtime.composeState(message)) as State;
        } else {
            currentState = await runtime.updateRecentMessageState(currentState);
        }

        try {
            // Compose and generate operation check content
            const operationContext = composeContext({
                state: currentState,
                template: getOperationTemplate,
            });
            const content = (await generateObjectDeprecated({
                runtime,
                context: operationContext,
                modelClass: ModelClass.SMALL,
            })) as unknown as GetOperationContent;

            //console.log("TP analyseMarket index operationcontent:", content);

            // Validate content
            if (!isGetOperationContent(content)) {
                throw new Error("Invalid operation check content");
            }

            // Setup Tavily for latest news
            const config = await validateCoinMarketCapConfig(runtime);
            const tavilyApiKey = runtime.getSetting("TAVILY_API_KEY") as string;

            const analysisService = createAnalysisService(
                config.COINMARKETCAP_API_KEY,
                tavilyApiKey
            );

            try {

                const tokenData = await analysisService.analyseMarket(
                    content.symbol,
                    content.currency,
                    content.amount
                );

                // Compose and generate market analysis content
                const analysisContext = composeContext({
                    state: {
                        dataFear: tokenData.dataFear,
                        dataLatestQuotes: tokenData.dataLatestQuotes,
                        dataLatestNewsCryptocurrency: tokenData.dataLatestNewsCryptocurrency,
                        dataLatestNewsStocksMarket: tokenData.dataLatestNewsStocksMarket,
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
                //console.log("TP2 analysisContent:", analysisContent);

                elizaLogger.success(
                    `Analysis retrieved successfully! ${content.symbol}: ${tokenData.price} ${content.currency.toUpperCase()}`
                );

                //console.log(`TP AnalyseMarket - operation:${content.operation}, advice:${analysisContent.advice}, proceed?${content.operation.toUpperCase().trim() === analysisContent.advice.toUpperCase().trim()}`);

                const priceInfo = `The current price of ${content.symbol} is ${tokenData.price} ${content.currency.toUpperCase()}.`;
                //let skipConfirmation = false;
                let adviceInfo = `I know you want to ${content.operation} but TradePilot thinks that it would be wiser to ${analysisContent.advice} giving the current conditions of the market`;
                if (content.operation.toUpperCase().trim() === analysisContent.advice.toUpperCase().trim()) {
                    adviceInfo = `TradePilot agrees with you, it would be wise to ${analysisContent.advice} the token now`;
                    //skipConfirmation = true;
                }
                //const analysisInfo = `The current price of ${content.symbol}`;

                // Updated formatted response to include chain
                const formattedResponse = [
                    `💱 Operation Details:`,
                    `────────────────`,
                    `💸 Operation: ${message.content.text}`,
                    `📤 Token Price: 1 ${content.symbol} is $${tokenData.price}`,
                    `🤖 My Advice: ${adviceInfo}`,
                    `📊 Full Analysis: ${analysisContent.analysis}`,
                    `────────────────`,
                    `💫 Still want to proceed with the operation? Type 'execute' to continue`,
                ].join("\n");

                let tokenFrom = content.symbol;
                let tokenTo = "USDC";
                if(content.operation.toUpperCase().trim()=== "BUY"){
                    tokenFrom = "USDC";
                    tokenTo = content.symbol;
                }

                const swapInquiry: SwapInquiry = {
                    tokenFrom: tokenFrom,
                    tokenTo: tokenTo,
                    amount: content.amount,
                };

                const memory: Memory = {
                    roomId: message.roomId,
                    userId: message.userId,
                    agentId: runtime.agentId,
                    content: {
                        text: JSON.stringify(swapInquiry),
                        type: TP_MEMORY.swap.type,
                    },
                };
                const memoryManager = new MemoryManager({
                    runtime,
                    tableName: TP_MEMORY.swap.tableName,
                });
                await memoryManager.createMemory(memory);

                if (callback) {
                    callback({
                        //text: `The current price of ${content.symbol} is ${priceData.price} ${content.currency.toUpperCase()}`,
                        text: `${formattedResponse}`,
                        content: {
                            symbol: content.symbol,
                            currency: content.currency,
                            ...tokenData,
                        },
                    });
                }

                return true;
            } catch (error) {
                console.error("2 Error in BUY_SELL handler:", error);
                elizaLogger.error("2 Error in BUY_SELL handler:", error);
                if (callback) {
                    callback({
                        text: `2 Error fetching analysis: ${error.message}`,
                        content: { error: error.message },
                    });
                }
                return false;
            }
        } catch (error) {
            console.error("1 Error in BUY_SELL handler:", error);
            elizaLogger.error("1 Error in BUY_SELL handler:", error);
            if (callback) {
                callback({
                    text: `1 Error fetching analysis: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    examples: operationExamples,
} as Action;
