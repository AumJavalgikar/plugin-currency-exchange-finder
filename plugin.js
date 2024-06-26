const { httpFetch } = Host.getFunctions();

function run() {
  const input = Host.inputString();

  try {
    const inputData = JSON.parse(input);

    let apiUrl = 'https://openexchangerates.org/api/';

    // Determine the type of request and construct the appropriate API URL
    switch (inputData.requestType) {
      case 'currencies':
        apiUrl += 'currencies.json';
        break;
      
        case 'historical':
        if (!inputData.date) {
          Host.outputString("Date is required for historical requests.");
          throw new Error("Date is required for historical requests.");
        }
        apiUrl += `historical/${inputData.date}.json`;
        if (inputData.base) apiUrl += `&base=${inputData.base}`;
        if (inputData.symbols) apiUrl += `&symbols=${inputData.symbols}`;
        if (inputData.show_alternative) apiUrl += `&show_alternative=${inputData.show_alternative}`;
        if (inputData.prettyprint) apiUrl += `&prettyprint=${inputData.prettyprint}`;
        break;

      case 'time-series':
        if (!inputData.app_id || !inputData.start || !inputData.end) {
          Host.outputString("App ID, start date, and end date are required for time series requests.");
          throw new Error("App ID, start date, and end date are required for time series requests.");
        }
        apiUrl += `time-series.json?app_id=${inputData.app_id}&start=${inputData.start}&end=${inputData.end}`;
        if (inputData.base) apiUrl += `&base=${inputData.base}`;
        if (inputData.symbols) apiUrl += `&symbols=${inputData.symbols}`;
        if (inputData.prettyprint) apiUrl += `&prettyprint=${inputData.prettyprint}`;
        break;

      case 'convert':
        if (!inputData.app_id || !inputData.value || !inputData.from || !inputData.to) {
          Host.outputString("App ID, value, from currency, and to currency are required for conversion requests.");
          throw new Error("App ID, value, from currency, and to currency are required for conversion requests.");
        }
        apiUrl += `convert/${inputData.value}/${inputData.from}/${inputData.to}?app_id=${inputData.app_id}`;
        if (inputData.prettyprint) apiUrl += `&prettyprint=${inputData.prettyprint}`;
        break;

      case 'ohlc':
        if (!inputData.app_id || !inputData.start_time || !inputData.period) {
          Host.outputString("App ID, start time, and period are required for OHLC requests.");
          throw new Error("App ID, start time, and period are required for OHLC requests.");
        }
        apiUrl += `ohlc.json?app_id=${inputData.app_id}&start_time=${inputData.start_time}&period=${inputData.period}`;
        if (inputData.base) apiUrl += `&base=${inputData.base}`;
        if (inputData.symbols) apiUrl += `&symbols=${inputData.symbols}`;
        if (inputData.prettyprint) apiUrl += `&prettyprint=${inputData.prettyprint}`;
        break;
      
      case 'usage':
        if (!inputData.app_id) {
          Host.outputString("App ID is required for usage statistics requests.");
          throw new Error("App ID is required for usage statistics requests.");
        }
        apiUrl += `usage.json?app_id=${inputData.app_id}`;
        if (inputData.hasOwnProperty('prettyprint')) {
          apiUrl += `&prettyprint=${inputData.prettyprint}`;
        }
        break;

      case 'latest':
      default:
        apiUrl += `latest.json?app_id=${inputData.app_id}`;
        if (!inputData.app_id) {
          Host.outputString("App ID is required for latest exchange rate requests.");
          throw new Error("App ID is required for latest exchange rate requests.");
        }
        if (inputData.base) apiUrl += `&base=${inputData.base}`;
        if (inputData.symbols) apiUrl +=`&symbols=${inputData.symbols}`;
        if (inputData.prettyprint) apiUrl +=`&prettyprint=${inputData.prettyprint}`;
        if (inputData.show_alternative) apiUrl +=`&show_alternative=${inputData.show_alternative}`;
    }
    
    // Define the request object for all endpoints
    const request = {
      method: "GET",
      url: apiUrl,
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Make the HTTP request
    const response = Http.request(request);

    if (response.status !== 200) {
      Host.outputString(`Error ${response.status}: ${response.statusText}`);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Output the response body directly
    Host.outputString(response.body);
  } catch (error) {
    Host.outputString(`Error: ${error.message}`);
  }
}

module.exports = { run };
