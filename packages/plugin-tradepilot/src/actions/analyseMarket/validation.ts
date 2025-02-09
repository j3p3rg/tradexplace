import { z } from "zod";
import type { GetOperationContent, GetPriceContent } from "./types";

export const GetPriceSchema = z.object({
    symbol: z.string(),
    currency: z.string().default("USD"),
});

export function isGetPriceContent(
    content: GetPriceContent
): content is GetPriceContent {
    return (
        typeof content.symbol === "string" &&
        typeof content.currency === "string"
    );
}


export function isGetOperationContent(
    content: GetOperationContent
): content is GetOperationContent {
    return (
        typeof content.symbol === "string" &&
        typeof content.currency === "string" &&
        typeof content.operation === "string"
    );
}
