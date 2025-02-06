import axios from "axios";
import type { ApiResponse, PriceData } from "./types";

const BASE_URL = "https://pro-api.coinmarketcap.com/";

export const createPriceService = (apiKey: string) => {
    const client = axios.create({
        baseURL: BASE_URL,
        headers: {
            "X-CMC_PRO_API_KEY": apiKey,
            Accept: "application/json",
        },
    });

    const getPrice = async (
        symbol: string,
        currency: string
    ): Promise<PriceData> => {
        const normalizedSymbol = symbol.toUpperCase().trim();
        const normalizedCurrency = currency.toUpperCase().trim();

        try {
            const response = await client.get<ApiResponse>(
                "v1/cryptocurrency/quotes/latest",
                {
                    params: {
                        symbol: normalizedSymbol,
                        convert: normalizedCurrency,
                    },
                }
            );

            console.log(
                "cryptocurrency/quotes/latest API Response:",
                JSON.stringify(response.data, null, 2)
            );

            //v3/fear-and-greed/latest
            const response2 = await client.get<ApiResponse>(
                "v3/fear-and-greed/latest",
                {
                    params: {},
                }
            );
            console.log(
                "v3/fear-and-greed/latest API Response:",
                JSON.stringify(response2.data, null, 2)
            );
            /*
            cryptocurrency/quotes/latest API Response: {
  "status": {
    "timestamp": "2025-02-06T11:19:03.998Z",
    "error_code": 0,
    "error_message": null,
    "elapsed": 18,
    "credit_count": 1,
    "notice": null
  },
  "data": {
    "XLM": {
      "id": 512,
      "name": "Stellar",
      "symbol": "XLM",
      "slug": "stellar",
      "num_market_pairs": 670,
      "date_added": "2014-08-05T00:00:00.000Z",
      "tags": [
        "medium-of-exchange",
        "enterprise-solutions",
        "decentralized-exchange-dex-token",
        "smart-contracts",
        "hashkey-capital-portfolio",
        "2017-2018-alt-season",
        "made-in-america"
      ],
      "max_supply": 50001806812,
      "circulating_supply": 30576150532.35,
      "total_supply": 50001786894.450264,
      "is_active": 1,
      "infinite_supply": false,
      "platform": null,
      "cmc_rank": 14,
      "is_fiat": 0,
      "self_reported_circulating_supply": null,
      "self_reported_market_cap": null,
      "tvl_ratio": null,
      "last_updated": "2025-02-06T11:18:00.000Z",
      "quote": {
        "USD": {
          "price": 0.3379597786138279,
          "volume_24h": 277828471.02575684,
          "volume_change_24h": -31.3598,
          "percent_change_1h": -0.72957184,
          "percent_change_24h": -1.75376474,
          "percent_change_7d": -15.87529229,
          "percent_change_30d": -26.78324315,
          "percent_change_60d": -30.27448053,
          "percent_change_90d": 233.45304359,
          "market_cap": 10333509064.776083,
          "market_cap_dominance": 0.3194,
          "fully_diluted_market_cap": 16898599560.47,
          "tvl": null,
          "last_updated": "2025-02-06T11:18:00.000Z"
        }
      }
    }
  }
}
v3/fear-and-greed/latest API Response: {
  "data": {
    "value": 35,
    "update_time": "2025-02-06T11:08:10.019Z",
    "value_classification": "Fear"
  },
  "status": {
    "timestamp": "2025-02-06T11:19:04.217Z",
    "error_code": "0",
    "error_message": "",
    "elapsed": 6,
    "credit_count": 1
  }
}
            */

            //https://pro-api.coinmarketcap.com/v4/ 
            /*const response2 = await client.get<ApiResponse>(
                "/dex/spot-pairs/latest",
                {
                    params: {
                        network_slug: "base",
                        //symbol: normalizedSymbol,
                        base_asset_symbol: normalizedSymbol.toLowerCase()+",usdc",
                        quote_asset_symbol: normalizedSymbol.toLowerCase()+",usdc",
                        dex_slug : "uniswap,pancakeswap,aerodrome"
                    },
                }
            );
            console.log(
                "cryptocurrency/quotes/latest API Response:",
                JSON.stringify(response2.data, null, 2)
            );*/

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
