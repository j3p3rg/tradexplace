import type { ActionExample } from "@elizaos/core";

export const operationExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Buy 0.0001 Bitcoin",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the market data and the current Bitcoin price for you before buying.",
                action: "BUY_TOKEN",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The current price of BTC is 97,345.90 USD. TradePilot thinks that it would be wise to WAIT: This is not the best moment to buy bitcoin, the fear and greed index shows that Bitcoin is overpriced.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Sell 20 XLM",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the market data and the current Bitcoin price for you before selling.",
                action: "SELL_TOKEN",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The current price of XLM is 0.33 USD. TradePilot thinks that it would be wise to SELL: This is the perfect moment to sell XLM, the fear and greed index shows that XLM is overpriced and there could be a market correction soon, so let's do it!!",
            },
        },
    ],
];

export const priceExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's the current price of Bitcoin?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the current Bitcoin price for you.",
                action: "GET_PRICE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The current price of BTC is 65,432.21 USD",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Check ETH price in EUR",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll check the current Ethereum price in EUR.",
                action: "GET_PRICE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The current price of ETH is 2,345.67 EUR",
            },
        },
    ],
];
