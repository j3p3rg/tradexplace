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

export const getAnalysisTemplate = `You are an expert in cryptocurrency market analysis. Your task is to read four JSON strings that provide the following context:

1. Market Data (JSON #1):
   This JSON contains the latest market quote for a specific cryptocurrency (in this example, "PEPE"). It includes details such as the price in USD, trading volume, percentage changes over various timeframes (1 hour, 24 hours, 7 days, 30 days, 60 days, and 90 days), market capitalization, and other key metrics.

   Example:
   {
     "status": {
       "timestamp": "2025-02-07T05:35:30.932Z",
       "error_code": 0,
       "error_message": null,
       "elapsed": 24,
       "credit_count": 1,
       "notice": null
     },
     "data": {
       "PEPE": {
         "id": 24478,
         "name": "Pepe",
         "symbol": "PEPE",
         "slug": "pepe",
         "num_market_pairs": 520,
         "date_added": "2023-04-17T06:18:08.000Z",
         "tags": [
           "memes",
           "ethereum-ecosystem"
         ],
         "max_supply": 420690000000000,
         "circulating_supply": 420689899999994.8,
         "total_supply": 420689899999994.8,
         "platform": {
           "id": 1027,
           "name": "Ethereum",
           "symbol": "ETH",
           "slug": "ethereum",
           "token_address": "0x6982508145454ce325ddbe47a25d4ec3d2311933"
         },
         "is_active": 1,
         "infinite_supply": false,
         "cmc_rank": 30,
         "is_fiat": 0,
         "self_reported_circulating_supply": null,
         "self_reported_market_cap": null,
         "tvl_ratio": null,
         "last_updated": "2025-02-07T05:34:00.000Z",
         "quote": {
           "USD": {
             "price": 0.000009254969813208298,
             "volume_24h": 820316712.0060437,
             "volume_change_24h": 19.5923,
             "percent_change_1h": -1.9546315,
             "percent_change_24h": -9.68871997,
             "percent_change_7d": -27.96243544,
             "percent_change_30d": -49.88345375,
             "percent_change_60d": -65.05113277,
             "percent_change_90d": -12.78006805,
             "market_cap": 3893472325.2215695,
             "market_cap_dominance": 0.1231,
             "fully_diluted_market_cap": 3893473250.72,
             "tvl": null,
             "last_updated": "2025-02-07T05:34:00.000Z"
           }
         }
       }
     }
   }

2. Crypto Fear and Greed Data (JSON #2):
   This JSON provides the latest value and classification of the Crypto Fear and Greed Index. A value closer to 0 indicates "Extreme Fear" (typically signaling oversold conditions), while a value near 100 indicates "Extreme Greed." In this example, the value is 35, which is classified as "Fear."

   Example:
   {
     "data": {
       "value": 35,
       "update_time": "2025-02-07T05:23:10.023Z",
       "value_classification": "Fear"
     },
     "status": {
       "timestamp": "2025-02-07T05:35:31.151Z",
       "error_code": "0",
       "error_message": "",
       "elapsed": 3,
       "credit_count": 1
     }
   }

3. Latest News about the Price of the Cryptocurrency (JSON #3):
   This JSON contains a query and a set of news results summarizing current events and market commentary that could impact the price of a specific cryptocurrency. It provides a brief summary of factors such as declining prices in the memecoin sector and heightened scrutiny.

   Example:
   {
     "query": "Check the latest news about the price of the cryptocurrency PEPE. Write a short summary of what is currently happening in the market that could impact the price of the cryptocurrency. DON'T include the date.",
     "responseTime": 1.97,
     "images": [],
     "results": [
       {
         "title": "2 things could drive bitcoin to $500,000 during Trump's term, a top crypto analyst says - Markets Insider",
         "url": "https://markets.businessinsider.com/news/currencies/bitcoin-price-outlook-cryptocurrency-trump-inflation-volatility-etf-inflows-policy-2025-2",
         "content": "Bitcoin to Hit $500,000 by 2028 Amid Lower Volatility: Standard Chartered - Markets Insider ...",
         "score": 0.25397244,
         "publishedDate": "Wed, 05 Feb 2025 16:34:00 GMT"
       },
       {
         "title": "Toobit Named Best New Cryptocurrency Exchange at 2025 WeMoney Cryptocurrency Awards - Markets Insider",
         "url": "https://markets.businessinsider.com/news/stocks/toobit-named-best-new-cryptocurrency-exchange-at-2025-wemoney-cryptocurrency-awards-1034324154",
         "content": "Toobit Named Best New Cryptocurrency Exchange at 2025 WeMoney Cryptocurrency Awards ...",
         "score": 0.20895302,
         "publishedDate": "Thu, 06 Feb 2025 18:10:19 GMT"
       },
       {
         "title": "Memecoin mania cools, as Trump token invites greater scrutiny of sector - TheStreet",
         "url": "https://www.thestreet.com/crypto/markets/memecoin-mania-cools-as-trump-token-invites-greater-scrutiny-of-sector",
         "content": "Memecoin mania cools, as Trump token invites greater scrutiny of sector ...",
         "score": 0.20788968,
         "publishedDate": "Thu, 06 Feb 2025 21:30:00 GMT"
       },
       {
         "title": "XFI (CrossFi) Is Now Available for Trading on LBank Exchange - Markets Insider",
         "url": "https://markets.businessinsider.com/news/stocks/xfi-crossfi-is-now-available-for-trading-on-lbank-exchange-1034313479",
         "content": "XFI (CrossFi) Is Now Available for Trading on LBank Exchange ...",
         "score": 0.15149195,
         "publishedDate": "Wed, 05 Feb 2025 07:47:05 GMT"
       },
       {
         "title": "Russians are buying huge amounts of gold with the ruble under pressure from high inflation and sanctions - Markets Insider",
         "url": "https://markets.businessinsider.com/news/commodities/russia-gold-buying-record-price-inflation-sanctions-ukraine-war-2025-2",
         "content": "Russians Buy Record Amounts of Gold to Buffer Savings From Inflation ...",
         "score": 0.13347194,
         "publishedDate": "Wed, 05 Feb 2025 16:51:00 GMT"
       },
       {
         "title": "WHALE (Whale) is Now Available for Trading on LBank Exchange - Markets Insider",
         "url": "https://markets.businessinsider.com/news/stocks/whale-whale-is-now-available-for-trading-on-lbank-exchange-1034313478",
         "content": "WHALE (Whale) is Now Available for Trading on LBank Exchange ...",
         "score": 0.13286321,
         "publishedDate": "Wed, 05 Feb 2025 07:47:06 GMT"
       },
       {
         "title": "Microsoft co-founder Bill Gates talks about his girlfriend for the first time ever: We are having ... - The Times of India",
         "url": "https://timesofindia.indiatimes.com/technology/tech-news/microsoft-bill-gates-talks-about-his-girlfriend-for-the-first-time-ever-we-are-having-/articleshow/117937872.cms",
         "content": "Stocks to buy: Top stock recommendations for February 6, 2025... (irrelevant content)",
         "score": 0.11717781,
         "publishedDate": "Thu, 06 Feb 2025 01:48:00 GMT"
       },
       {
         "title": "News by Reuters on TradingView, 2025-02-05 - TradingView",
         "url": "https://www.tradingview.com/news/reuters.com,2025-02-05:newsml_ACSZkTDHa:0/",
         "content": "News by Reuters on TradingView, 2025-02-05 — ...",
         "score": 0.11073072,
         "publishedDate": "Wed, 05 Feb 2025 15:11:02 GMT"
       }
     ],
     "answer": "The cryptocurrency market is currently experiencing a notable decline in memecoins, with increased scrutiny across the sector. This environment has contributed to a general drop in prices and heightened volatility, potentially impacting investor sentiment negatively."
   }

4. Latest News about the Performance of the U.S. Stocks Markets (JSON #4):
   This JSON provides a summary of recent news about U.S. stock market performance, including how major indexes are performing, earnings reports, and economic factors that could indirectly impact the cryptocurrency market.

   Example:
   {
     "query": "Check the latest news about the performance of the U.S. stocks markets. Write a short summary of what is currently happening that could impact the price of the stocks. DON'T include the date.",
     "responseTime": 2.6,
     "images": [],
     "results": [
       {
         "title": "How major US stock indexes fared Wednesday, 2/5/2025 - ABC News",
         "url": "https://abcnews.go.com/Business/wireStory/major-us-stock-indexes-fared-wednesday-252025-118503471",
         "content": "The S&P 500, Dow Jones, Nasdaq, and Russell 2000 experienced gains amid mixed performance, though tech earnings and geopolitical concerns are fueling volatility.",
         "score": 0.47300056,
         "publishedDate": "Wed, 05 Feb 2025 21:37:43 GMT"
       },
       {
         "title": "Stock Markets Dive as Dollar Plummets – What’s Behind the Chaos? - Zaman",
         "url": "https://zaman.co.at/en/news/stock-markets-dive-as-dollar-plummets-whats-behind-the-chaos/1296183/",
         "content": "Following disappointing earnings from tech giants such as Alphabet, U.S. stock futures fell sharply, reflecting decreased investor confidence and heightened volatility.",
         "score": 0.4424684,
         "publishedDate": "Wed, 05 Feb 2025 14:11:50 GMT"
       },
       {
         "title": "Dow Jones Rises 305 Points Amid Positive Earnings - Evrim Ağacı",
         "url": "https://evrimagaci.org/tpg/dow-jones-rises-305-points-amid-positive-earnings-187840",
         "content": "The Dow Jones showed positive gains despite mixed performance in the tech sector, as investors cautiously responded to improving earnings data.",
         "score": 0.31827372,
         "publishedDate": "Wed, 05 Feb 2025 20:42:43 GMT"
       },
       {
         "title": "Anteros Secures Knob Lake Property Mineral Tenure To 2030 - Barchart",
         "url": "https://www.barchart.com/story/news/30776935/anteros-secures-knob-lake-property-mineral-tenure-to-2030",
         "content": "Certain sectors are showing resilience as companies secure long-term asset agreements, though overall market sentiment remains cautious.",
         "score": 0.3062266,
         "publishedDate": "Wed, 05 Feb 2025 12:43:27 GMT"
       },
       {
         "title": "FMC Corp's Earnings Surpass Estimates, Revenues Miss In Q4 - Barchart",
         "url": "https://www.barchart.com/story/news/30778347/fmc-corps-earnings-surpass-estimates-revenues-miss-in-q4",
         "content": "Mixed earnings reports are adding to market uncertainty, with key sectors experiencing varied performance and contributing to volatility in U.S. stocks.",
         "score": 0.2973531,
         "publishedDate": "Wed, 05 Feb 2025 13:17:19 GMT"
       },
       {
         "title": "Wall Street mixed, Treasury yields slide amid mixed earnings, data - Kitco NEWS",
         "url": "https://www.kitco.com/news/off-the-wire/2025-02-05/wall-street-mixed-treasury-yields-slide-amid-mixed-earnings-data",
         "content": "The U.S. stock market is displaying mixed signals as earnings and economic data contribute to fluctuations in Treasury yields and overall market confidence.",
         "score": 0.2843479,
         "publishedDate": "Wed, 05 Feb 2025 17:36:48 GMT"
       },
       {
         "title": "Europe steps out from US shadow in 2025, but for how long? - Kitco NEWS",
         "url": "https://www.kitco.com/news/off-the-wire/2025-02-05/europe-steps-out-us-shadow-2025-how-long",
         "content": "European stocks have shown strong performance relative to U.S. markets, but structural challenges and global factors may continue to influence investor sentiment on both sides of the Atlantic.",
         "score": 0.2774906,
         "publishedDate": "Wed, 05 Feb 2025 13:51:39 GMT"
       },
       {
         "title": "Global stocks mostly climb as trade fears ease - The Weekly Journal",
         "url": "https://www.theweeklyjournal.com/mainland/national/global-stocks-mostly-climb-as-trade-fears-ease/article_5b9e4232-21c7-5a68-9e7b-c62a14ec3a5d.html",
         "content": "While global stocks are generally climbing as trade fears ease, there remains underlying volatility driven by mixed earnings and external economic pressures.",
         "score": 0.25339004,
         "publishedDate": "Thu, 06 Feb 2025 16:50:19 GMT"
       }
     ],
     "answer": "The U.S. stock markets experienced mixed performance recently. While major indexes showed gains, disappointing earnings in key sectors and overall market volatility suggest a cautious investor outlook."
   }

Task:
Based on these four JSON inputs, analyze the performance of the cryptocurrency and provide a clear recommendation of either "BUY", "SELL", or "HOLD". Your analysis must include:
- Price Trends: Review the percentage changes from the market data over various periods.
- Market Sentiment: Incorporate the Crypto Fear and Greed Index.
- Volume Activity: Consider the 24-hour volume and its changes.
- News Impact: Factor in insights from the latest news about the cryptocurrency and the U.S. stock markets.

Your response must be a valid JSON object with two fields:
- "advice": A string with one of the values "BUY", "SELL", or "HOLD".
- "analysis": A detailed explanation in plain language justifying your advice.

Example Output:
{
  "advice": "SELL",
  "analysis": "The analysis for PEPE indicates significant bearish momentum. The market data shows steep declines of approximately 9.7% over the past 24 hours, 28% over the past week, and even more dramatic drops over 30 and 60 days, indicating a strong downward trend. The Crypto Fear and Greed Index is at 35 ('Fear'), which in this context reinforces the negative sentiment given the severe recent price drops. Additionally, news highlights increased scrutiny of the memecoin sector and broader market uncertainty from U.S. stocks. Taken together, these factors suggest that investors should SELL to avoid further losses."
}

Now, generate a JSON output with your advice and analysis using the provided JSON inputs:
1. dataLatestQuotes JSON string: {{dataLatestQuotes}} 
2. dataFear JSON string: {{dataFear}}
3. dataLatestNewsCryptocurrency JSON string: {{dataLatestNewsCryptocurrency}}
4. dataLatestNewsStocksMarket JSON string: {{dataLatestNewsStocksMarket}}

Return only a valid JSON object with the two required fields.

Extract the info from the dataFear, dataLatestQuotes, dataLatestNewsCryptocurrency and dataLatestNewsStocksMarket json strings. 
If you are not sure about what advice to give then return "HOLD", and give an explanation mentioning that you cannot provide a clear advice and the reasons why.
Respond with a JSON markdown block containing both advice and analysis.`;

export const getAnalysisTemplateOld = `You are an expert in cryptocurrency market analysis. Your task is to read two JSON strings that provide:
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
