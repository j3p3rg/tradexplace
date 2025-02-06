export const getPriceTemplate = `Respond with a JSON object containing BOTH symbol and currency. Currency must default to "USD" if not specified.

Here are the cryptocurrency symbol mappings:
- bitcoin/btc -> BTC
- ethereum/eth -> ETH
- solana/sol -> SOL
- cardano/ada -> ADA
- ripple/xrp -> XRP
- dogecoin/doge -> DOGE
- polkadot/dot -> DOT
- usdc -> USDC
- tether/usdt -> USDT

IMPORTANT: Response must ALWAYS include both "symbol" and "currency" fields.

Example response:
\`\`\`json
{
    "symbol": "BTC",
    "currency": "USD"
}
\`\`\`

{{recentMessages}}

Extract the cryptocurrency from the most recent message. Always include currency (default "USD").
Respond with a JSON markdown block containing both symbol and currency.`;


export const getAnalysisTemplate = `You are an expert in cryptocurrency market analysis. Your task is to read two JSON strings that provide:
-Market Data for a specific cryptocurrency (e.g., XLM) from CoinMarketCap, which includes details such as price, volume, percent changes over various periods, market capitalization, etc.
-Crypto Fear and Greed Index Data that shows the current market sentiment with a numeric value and classification. When the value is closer to 0, the market is in Extreme Fear, and investors have over-sold irrationally. When the value is closer to 100, the market is in Extreme Greed, indicating a likely market correction. 1 ≤ x < 20: Extreme Fear. 20 ≤ x < 40: Fear .40 ≤ x < 60: Neutral. 60 ≤ x < 80: Greed. 80 ≤ x ≤ 100: Extreme Greed

Based on the two following JSON inputs, analyze the performance of the cryptocurrency and provide a clear, concise recommendation to either "BUY", "SELL", or "HOLD". 
1. dataLatestQuotes JSON string: {{dataLatestQuotes}} 
2. dataFear JSON string: {{dataFear}}

Your analysis should be easy to understand yet complete and must justify your recommendation with reference to:

Price Trends: Consider percentage changes over 1 hour, 24 hours, 7 days, 30 days, 60 days, and 90 days.
Market Sentiment: Use the Fear and Greed Index value and classification to assess overall investor sentiment.
Trading Volume: Evaluate recent volume data to understand liquidity and activity.
Market Capitalization and Dominance: Assess the strength and stability of the asset.

Your response must be a valid JSON object containing two fields:
"advice": A string that is one of "BUY", "SELL", or "HOLD".
"analysis": A detailed explanation (in plain language) that justifies the advice.

Example Input:
Market Data Latest Quotes (JSON #1):
{"status": {
"timestamp": "2025-02-06T16:06:49.338Z",
"error_code": 0,
"error_message": null,
"elapsed": 28,
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
"circulating_supply": 30576150001.725166,
"total_supply": 50001786894.45024,
"is_active": 1,
"infinite_supply": false,
"platform": null,
"cmc_rank": 14,
"is_fiat": 0,
"self_reported_circulating_supply": null,
"self_reported_market_cap": null,
"tvl_ratio": null,
"last_updated": "2025-02-06T16:05:00.000Z",
"quote": {
"USD": {
"price": 0.3213420246545539,
"volume_24h": 303597601.6819276,
"volume_change_24h": -18.0954,
"percent_change_1h": -1.75700855,
"percent_change_24h": -5.02811097,
"percent_change_7d": -26.74466379,
"percent_change_30d": -25.32759126,
"percent_change_60d": -34.1733812,
"percent_change_90d": 216.1453328,
"market_cap": 9825401947.695707,
"market_cap_dominance": 0.3107,
"fully_diluted_market_cap": 16067681837.35,
"tvl": null,
"last_updated": "2025-02-06T16:05:00.000Z"}}}}}

Crypto Fear and Greed Data (JSON #2):
{"data": {
"value": 35,
"update_time": "2025-02-06T15:53:10.021Z",
"value_classification": "Fear"
},
"status": {
"timestamp": "2025-02-06T16:06:49.433Z",
"error_code": "0",
"error_message": "",
"elapsed": 2,
"credit_count": 1}}

Example Output:
{
"advice": "BUY",
"analysis": "The analysis of XLM shows mixed short-term and long-term trends. In the short term, there has been a 5% decline in the last 24 hours and a 26.7% drop over the last 7 days, suggesting temporary weakness. However, the 90-day change is a substantial increase of 216%, which indicates strong long-term growth potential. Additionally, the Fear and Greed Index is at 35, indicating a 'Fear' environment, which typically presents a buying opportunity as prices may be oversold. The robust market cap and steady volume further support the view that this is a strategic buying opportunity. Therefore, the recommendation is to BUY."
}

Now, using the input JSON strings provided, generate a JSON output with your advice and analysis.
Return only a valid JSON object with the two required fields.

Extract the info from the dataFear and dataLatestQuotes json strings. 
If you are not sure about what advie to give then return "HOLD", and give an explanation mentioning that you cannot provide a clear advice and the reasons why.
Respond with a JSON markdown block containing both advice and analysis.`;
