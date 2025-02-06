import type { Plugin } from "@elizaos/core";
import getPrice from "./actions/getPrice";

export const coinmarketcapPlugin: Plugin = {
    name: "tradepilot",
    description: "TradePilot Plugin for Eliza",
    actions: [getPrice],
    evaluators: [],
    providers: [],
};

export default coinmarketcapPlugin;
