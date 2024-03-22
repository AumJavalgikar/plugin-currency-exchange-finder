# OpenExchangeRates API Integration Guide

## Overview

This guide outlines the process for integrating the OpenExchangeRates API into your agents. By leveraging this API, you gain access to accurate and up-to-date exchange rate information for over 170 currencies globally. The integration process includes generating a WebAssembly (WASM) plugin with Extism.

## Prerequisites

Before starting, an API key from OpenExchangeRates is required. You can register for an API key on their [signup page](https://openexchangerates.org/signup/developer). The free plan, offering up to 1,000 requests per month, should suffice for basic needs.

## Building the Plugin

Create the WASM plugin by running the following command in your terminal:

```shell
extism-js plugin.js -i -o plugin.wasm
```

## Making API Requests

Below are examples detailing how to structure your API requests for different operations:

### 1) Fetching Latest Exchange Rates | [Reference](https://docs.openexchangerates.org/reference/latest-json)

- **Request JSON:**

```json
{ 
    "app_id": "YOUR_APP_ID"
}
```

- **Extism CLI Command:**

```shell
extism call plugin.wasm run --input '{ "app_id": "YOUR_APP_ID" }' --wasi --allow-host '*'
```

### 2) Retrieving Historical Exchange Rates (Available since 1999) | [Reference](https://docs.openexchangerates.org/reference/historical-json)

- **Request JSON:**

```json
{
  "requestType": "historical",
  "app_id": "YOUR_APP_ID",
  "date": "2001-02-16",
  "base": "USD",
  "symbols": "EUR,GBP",
  "show_alternative": 0,
  "prettyprint": 0
}
```

- **Extism CLI Command:**

```shell
extism call plugin.wasm run --input '{"requestType": "historical", "app_id": "YOUR_APP_ID", "date": "2001-02-16", "base": "USD", "symbols": "EUR,GBP", "show_alternative": 0, "prettyprint": 0}' --wasi --allow-host '*'
```

### 3) Fetching Currency Symbols | [Reference](https://docs.openexchangerates.org/reference/currencies-json)

- **Request JSON:**

```json
{
    "requestType": "currencies"
}
```

- **Extism CLI Command:**

```shell
extism call plugin.wasm run --input '{"requestType": "currencies"}' --wasi --allow-host '*'
```

### 4) Historical exchange rates for a given time period (Enterprise and Unlimited plans) | [Reference](https://docs.openexchangerates.org/reference/time-series-json)

- **Request JSON:**

```json
{
  "requestType": "time-series",
  "app_id": "YOUR_APP_ID",
  "start": "2012-01-01",
  "end": "2012-01-31",
  "base": "AUD",
  "symbols": "BTC,EUR,HKD",
  "prettyprint": 1
}
```
- **Extism CLI Command:**

```shell
extism call plugin.wasm run --input '{"requestType": "time-series","app_id": "YOUR_APP_ID","start": "2012-01-01","end": "2012-01-31","base": "AUD","symbols": "BTC,EUR,HKD","prettyprint": 1}' --wasi --allow-host '*'
```

### 5) Currency Conversion (Unlimited plan) | [Reference](https://docs.openexchangerates.org/reference/convert)

- **Request JSON (Unlimited plan required):**

```json
{
    "requestType": "convert", 
    "app_id": "YOUR_APP_ID", 
    "value": 19999.95, 
    "from": "GBP", 
    "to": "EUR", 
    "prettyprint": 1
}
```

- **Extism CLI Command:**

```shell
extism call plugin.wasm run --input '{"requestType": "convert", "app_id": "YOUR_APP_ID", "value": 19999.95, "from": "GBP", "to": "EUR", "prettyprint": 1}' --wasi --allow-host '*'
```

### 6) Get historical Open, High Low, Close (OHLC) and Average exchange rates for a given time period, ranging from 1 month to 1 minute (VIP Platinum) | [Reference](https://docs.openexchangerates.org/reference/ohlc-json)

- **Request JSON:**

```json
{
  "requestType": "ohlc",
  "app_id": "YOUR_APP_ID",
  "start_time": "2017-07-17T11:00:00Z",
  "period": "30m",
  "base": "USD",
  "symbols": "GBP,EUR,HKD",
  "prettyprint": 1
}
```

- **Extism CLI Command:**

```shell
extism call plugin.wasm run --input '{"requestType": "ohlc", "app_id": "YOUR_APP_ID", "start_time": "2017-07-17T11:00:00Z", "period": "30m", "base": "USD", "symbols": "GBP,EUR,HKD", "prettyprint": 1}' --wasi --allow-host '*'
```

### 7) To view basic plan information and your usage statistics for the Open Exchange Rates App ID | [Reference](https://docs.openexchangerates.org/reference/usage-json)

- **Request JSON:**

```json
{
  "requestType": "usage",
  "app_id": "YOUR_APP_ID",
  "prettyprint": 1
}
```

- **Extism CLI Command:**

```shell
extism call plugin.wasm run --input '{"requestType": "usage", "app_id": "YOUR_APP_ID", "prettyprint": 1}' --wasi --allow-host '*'
```

## Testing with CLI

Test the plugin using the Extism CLI, ensuring to replace `YOUR_APP_ID` with your actual OpenExchangeRates API key.
