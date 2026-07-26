# Home AI Rig Cost Calculator

A lightweight tool for estimating the cost of running a local AI compute rig — both electricity-only and total cost of ownership (TCO) with hardware amortization — compared to cloud API pricing tiers.

## Features

- **Electricity cost** per million tokens based on power draw, inference speed, and electricity rate
- **Hardware amortization** over a configurable period (years), factoring in component cost and daily token usage
- **Total cost of ownership** combining running costs with amortized hardware expense
- **Cloud comparison table** showing where your calculated cost falls relative to major cloud model tiers (Small → Frontier)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + TypeScript |
| UI Components | MUI (Material UI) v9, dark theme |
| Build tool | Vite |
| Styling | CSS Modules |
| Linting / formatting | ESLint, Prettier |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server with HMR
npm run dev

# Type-check and lint
npm run build    # runs tsc + vite build
npm run lint     # ESLint
```

## How It Works

### Electricity cost per million tokens

```
(power_watts × electricity_cost_per_kWh × 1_000_000) / (3_600_000 × inference_speed_tok_s)
```

This represents the running cost of powering your rig while generating tokens.

### Hardware amortization per million tokens

```
(hardware_cost × 1_000_000) / (tokens_per_day × 365 × amortization_years)
```

Spreads a one-time hardware purchase over time to arrive at a daily-per-token cost.

### Total cost of ownership

Electricity + amortized hardware, giving the full picture for budgeting decisions.

## Cloud Comparison Tiers

The built-in table (as of 2026) maps your total cost against typical cloud model pricing:

| Tier | Examples | Cost Range ($/MTok) |
|------|----------|---------------------|
| Small | Claude Haiku, GPT mini, Gemini Flash-Lite | $1 – $5 |
| Medium | Claude Sonnet, GPT Luna, Gemini Flash | $9 – $15 |
| Large | Claude Opus, GPT Terra, Gemini Pro | $18 – $25 |
| Frontier | Claude Fable, GPT Sol | $45 – $50 |

These ranges are approximate and intended for rough comparison only. Cloud pricing changes frequently — check the [OpenAI](https://developers.openai.com/api/docs/pricing), [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing), and [Google](https://ai.google.dev/gemini-api/docs/pricing) documentation for current rates.

## Inputs Explained

| Field | What to enter |
|-------|---------------|
| Total Power Draw (W) | Real-world wattage via a Kill A Watt meter, or PCPartPicker's "Estimated Wattage" |
| Cost of Electricity ($/kWh) | Your local electricity rate |
| Inference Speed (tok/s) | Benchmark decode speed from [Will It Run AI](https://willitrunai.com/) or real-world measurement |
| Cost of Components ($) | Total hardware purchase price |
| Token usage per day | Estimated daily token generation volume |
| Amortization Length (years) | How long you plan to keep the hardware |

## Disclaimer

This tool provides rough estimates for planning purposes only. Actual costs will vary based on workload patterns, hardware efficiency, electricity rate fluctuations, and model behavior. This project is not affiliated with, endorsed by, or connected to OpenAI, Anthropic, Google, or any other company mentioned. All trademarks belong to their respective owners.
