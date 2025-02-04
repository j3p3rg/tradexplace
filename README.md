# TradePilot

TradePilot is a Telegram bot designed to help users make smarter investment decisions when buying or selling cryptocurrencies. By analyzing current market data and sentiment, TradePilot offers context-aware advice before executing any trade. If the market conditions are unfavorable, the bot notifies the user and halts the trade unless the user explicitly confirms.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
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

#### Start Eliza

```bash
pnpm i
pnpm build

# The project iterates fast, sometimes you need to clean the project if you are coming back to the project
pnpm clean
```

### Interact via Browser

Once the agent is running, you should see the message to run "pnpm start:client" at the end.

Open another terminal, move to the same directory, run the command below, then follow the URL to chat with your agent.

```bash
pnpm start:client
```

Then read the [Documentation](https://elizaos.github.io/eliza/) to learn how to customize your Eliza.

---

### Modify Character

1. Open `packages/core/src/defaultCharacter.ts` to modify the default character. Uncomment and edit.

2. To load custom characters:
    - Use `pnpm start --characters="path/to/your/character.json"`
    - Multiple character files can be loaded simultaneously
3. Connect with X (Twitter)
    - change `"clients": []` to `"clients": ["twitter"]` in the character file to connect with X

---

#### Additional Requirements

You may need to install Sharp. If you see an error when starting up, try installing it with the following command:

```
pnpm install --include=optional sharp
```

---

## Usage

Once the bot is running, it will listen for commands on Telegram. For example, a user can make requests such as:

- `Buy 0.001 ETH`
- `Sell 0.001 ETH`

Upon receiving a command, TradePilot will:
1. Query the latest market data and analyze sentiment.
2. Provide a response with market context and advice.
3. Execute the trade if conditions are favorable, or alert the user if caution is advised.

## Configuration

- **Market Analysis:** Customize your analysis logic in `x.ts` to include additional indicators or to integrate more data sources.
- **Trade Execution:** The module `x.ts` handles trade execution and can be adapted to support different exchanges or simulated environments for testing.
- **Telegram Commands:** Edit `x.ts` to add new commands or modify existing ones to better suit your workflow.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions, feedback, or suggestions, please open an issue in this repository or email [tradepilot@email.com](mailto:tradepilot@email.com).


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
