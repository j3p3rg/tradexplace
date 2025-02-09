import type { Plugin } from "@elizaos/core";
import analyseMarket from "./actions/analyseMarket";

export const tradepilotPlugin: Plugin = {
    name: "tradepilot",
    description: "TradePilot Plugin for Eliza",
    actions: [analyseMarket],
    evaluators: [],
    providers: [],
};

export default tradepilotPlugin;
