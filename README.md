# OpenExchangeRates API Integration
## Overview
This guide provides step-by-step instructions for integrating the OpenExchangeRates API into your application to retrieve real-time currency exchange rate information. Utilizing the OpenExchangeRates API, you can access reliable and up-to-date exchange rates for over 170 currencies worldwide. This integration involves generating a WebAssembly (WASM) plugin using Extism.

# Prerequisites
Before you begin, you will need to secure an API key from OpenExchangeRates. Register for an API key here. The free plan offers up to 1,000 requests per month, which is sufficient for basic usage.

# Parameters
To make a request to the OpenExchangeRates API, you need to specify your API key and the currencies you are interested in. Here are examples of how to structure your requests:

- For fetching the latest exchange rates:

```json
{ "app_id": "your_app_id" }
```

We can now fetch the latest exchange rates using the Extism CLI's run command:
```shell
extism call plugin.wasm run --input '{ "app_id": "myappid"}' --wasi --allow-host '*'
```

To convert between specific currencies:

```json
{
"app_id": "your_app_id",
"base": "USD",
"symbols": "EUR,GBP"
}
```

Command to convert between specific currencies use the command (Note: currently available for clients on the Unlimited plan.):
```shell
extism call plugin.wasm run --input '{"requestType": "convert", "app_id": "YOUR_APP_ID", "value": 19999.95, "from": "GBP", "to": "EUR", "prettyprint": true}' --wasi --allow-host '*'
```

To fetch JSON list of all currency symbols available from the Open Exchange Rates API, along with their full names:

```json
{"requestType": "currencies"}
```

Command to fetch all currency symbols:

```shell
extism call plugin.wasm run --input '{"requestType": "currencies"}' --wasi --allow-host '*'
```

To get historical exchange rates for any date available from the Open Exchange Rates API, currently going back to 1st January 1999

```json
{
  "requestType": "historical",
  "app_id": "YOUR_APP_ID",
  "date": "2001-02-16",
  "base": "USD",
  "symbols": "EUR,GBP",
  "show_alternative": false,
  "prettyprint": false
}
```
Command to get historical exchange rates:
```shell
extism call plugin.wasm run --input '{"requestType": "historical", "app_id": "YOUR_APP_ID", "date": "2001-02-16", "base": "USD", "symbols": "EUR,GBP", "show_alternative": false, "prettyprint": false}' --wasi --allow-host '*'
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
