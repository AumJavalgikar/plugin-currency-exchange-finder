# OpenExchangeRates API Integration
## Overview
This guide provides step-by-step instructions for integrating the OpenExchangeRates API into your application to retrieve real-time currency exchange rate information. Utilizing the OpenExchangeRates API, you can access reliable and up-to-date exchange rates for over 170 currencies worldwide. This integration involves generating a WebAssembly (WASM) plugin using Extism.

# Prerequisites
Before you begin, you will need to secure an API key from OpenExchangeRates. Register for an API key here. The free plan offers up to 1,000 requests per month, which is sufficient for basic usage.

# Parameters
To make a request to the OpenExchangeRates API, you need to specify your API key and the currencies you are interested in. Here are examples of how to structure your requests:

- For fetching the latest exchange rates:

```json
{ "apikey": "your_api_key" }
```
To convert between specific currencies:

```json
{ "apikey": "your_api_key", "base": "USD", "symbols": "EUR,GBP" }
```

Building the Plugin
To create the WASM plugin, execute the following command:

```shell
extism-js plugin.js -i -o plugin.wasm
```
Testing with CLI
After building the plugin, you can test it using the Extism CLI with the following command:


```shell
extism call plugin.wasm run --input '{ "apikey": "your_api_key", "base": "USD", "symbols": "EUR,GBP" }' --wasi --allow-host '*'
```
Replace your_api_key with your actual OpenExchangeRates API key, and adjust the base and symbols parameters as needed to fit your currency conversion requirements. This setup will allow you to quickly and efficiently integrate real-time currency data into your agents.