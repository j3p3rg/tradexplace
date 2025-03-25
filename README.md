# TradePilot

TradePilot is a Telegram bot designed to help users make smarter investment decisions when buying or selling cryptocurrencies. By analyzing current market data and sentiment, TradePilot offers context-aware advice before executing any trade. If the market conditions are unfavorable, the bot notifies the user and halts the trade unless the user explicitly confirms.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Techstack](#techstack)
- [Future](#future)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

In today's fast-paced crypto markets, making quick, well-informed decisions is crucial. TradePilot is built to be your co-pilot in the world of digital asset trading. When a user sends a buy or sell command via Telegram, TradePilot first examines the market conditions and sentiment. If the market signals are weak or negative, the bot will warn the user rather than executing a potentially risky trade. This helps users avoid poor entry or exit points and manage risk more effectively.

## Features

- **Market Analysis:** Automatically retrieves and analyzes real-time market data to determine sentiment and context.
- **Informed Trading Decisions:** Provides users with clear advice on whether conditions are favorable for trading.
- **User-Controlled Execution:** Executes trades only when market sentiment is positive or when the user explicitly confirms in adverse conditions.
- **Telegram Integration:** Operates seamlessly on Telegram, making it accessible and user-friendly.
- **Modular and Extensible:** Easily integrate additional market data sources or analytical indicators as your strategies evolve.

## Techstack

I used the Eliza framework for creating TradePilot. I created a plugin with the bot functionality using the plugin-coinmarketcap as the starting point, and added the Tavily SDK implementation to create a full context of what is happening in the markets combining real time token data from CoinmarketCap with latest news about the markets from Tavily. I'm also using the plugin-evm for starting the token swaps. The bot is using also the Telegram client to interact with users through Telegram with natural language.

## Future

- **Swap enhancement:** Currently the swap functionality is not working properly due to bugs from the EVM plugin that need to be fixed. Next version will enabled this feature 100% and will make it multichain. We will also implement a pair spot search functionality to look for the best quote for the swap before starting the operation, ensuring the users get the best prices.
- **Wallet management:** We didn't have time to add the wallet management feature using Privy's SDK. In the next version, this feature will allow the bot to create a wallet whenever a new user starts a conversation with him in Telegram, and associate the wallet id to the telegram's user id for individualization of the wallets. Using the Privy's SDK will be also possible to buy tokens for the wallet and make transfers.
- **Other tokens recommendations:** We will also implement a top 10 of trending cryptocurrencies based on volume and market activity so whenever the bot identifies that is not good moment to BUY the token selected by the user, the bot could offer other opportunities with better market conditions.

## Installation

### Prerequisites

- [Python 2.7+](https://www.python.org/downloads/)
- [Node.js 23+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [pnpm](https://pnpm.io/installation)
- A Telegram account and a bot token obtained from [BotFather](https://core.telegram.org/bots#botfather)

> **Note for Windows Users:** [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install-manual) is required.

### Manually Start Eliza

#### Edit the .env file

Copy .env.example to .env and fill in the appropriate values.

```
cp .env.example .env
```

**Configure Environment Variables:**

   Create a `.env` file (or set the environment variables in your deployment environment) with the following keys:

   ```ini
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token # Required: API key for connecting Eliza to Telegram
   COINMARKETCAP_API_KEY=your_api_key # Required: API key for real time token data
   TAVILY_API_KEY=your_api_key    # Required: API key for search service
   TAVILY_API_KEY=your_api_key    # Required: API key for search service
   GOOGLE_GENERATIVE_AI_API_KEY= your_gemini_key # Gemini API key, you can get a free one at Google AI studio
   XAI_MODEL="gemini-2"
   EVM_PRIVATE_KEY=your_wallet_key #If you want to try the swap features
   EVM_PUBLIC_KEY=your_wallet_public_key #If you want to try the swap features
   ```


#### Build Eliza dependencies and Plugins

```bash
pnpm install
pnpm build
nvm install v23.3.0 #node v23.3.0 is required to avoid additional erros while running the agent

# If you have any errors while running the install command then try this one:

```

### Interact via Browser

Once the agent is running, you should see the message to run "pnpm start:client" at the end.

Open another terminal, move to the same directory, run the command below, then follow the URL to chat with your agent.

```bash
pnpm start:client
```

Then read the [Documentation](https://elizaos.github.io/eliza/) to learn how to customize your Eliza.

---

### Using TradePilot Character

1. To load TradePilot character:
    - Use `pnpm start --characters="characters/tradepilot.character.json"`

2. If you get errors running the client related to sqlite3, try te solution in this:
https://elizaos.github.io/eliza/docs/quickstart/#common-issues--solutions

---

#### Additional Requirements

You may need to install Sharp. If you see an error when starting up, try installing it with the following command:

```
pnpm install --include=optional sharp
```

---

## Usage

Once the bot is running, it will listen for commands on Telegram using natural language. For example, a user can make requests such as:

- `Buy $10 of ETH`
- `Sell 0.001 ETH`

Upon receiving a command, TradePilot will:
1. Query the latest token data and market news to make a full analysis of the operation.
2. Provide a response with market context and advice.
3. Execute the trade if conditions are favorable, or alert the user if caution is advised.

## Configuration

- **Market Analysis:** Customize your analysis logic in the `index.ts` and `service.ts`files inside `plugin-tradepilot/src/actions/analyseMarket` to include additional indicators or to integrate more data sources.
- **Trade Execution:** The `swap.ts` file inside `plugin-evm/src/actions` handles trade execution and can be adapted to support different exchanges.
- **Telegram Commands:** Edit `/telegramClient.ts` in `client-telegram/src/` to customize the Telegram experience, adding a whitelist capability for instance.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions, feedback, or suggestions, please open an issue in this repository or email [tradepilot.telebot@gmail.com](tradepilot.telebot@gmail.com).


## Citation for the Eliza Framework

Eliza's team now have a [paper](https://arxiv.org/pdf/2501.06781) where more info about the framework could be found:
```bibtex
@article{walters2025eliza,
  title={Eliza: A Web3 friendly AI Agent Operating System},
  author={Walters, Shaw and Gao, Sam and Nerd, Shakker and Da, Feng and Williams, Warren and Meng, Ting-Chien and Han, Hunter and He, Frank and Zhang, Allen and Wu, Ming and others},
  journal={arXiv preprint arXiv:2501.06781},
  year={2025}
}
```
