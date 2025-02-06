import type { Plugin } from "@elizaos/core";
import getPrice from "./actions/getPrice";

export const tradepilotcPlugin: Plugin = {
    name: "tradepilotc",
    description: "TradePilotC Plugin for Eliza",
    actions: [getPrice],
    evaluators: [],
    providers: [],
};

export default tradepilotcPlugin;
