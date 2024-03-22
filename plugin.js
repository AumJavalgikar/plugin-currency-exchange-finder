const { httpFetch } = Host.getFunctions();

function run() {
  const input = Host.inputString();

  try {
    const inputData = JSON.parse(input);

    if (!inputData.app_id) {
      Host.outputString("App ID is required.");
      throw new Error("App ID is required.");
    }

    // Construct the base URL and parameters
    let apiUrl = 'https://openexchangerates.org/api/';
    const params = [];

    // Add the app_id to the parameters list
    params.push(`app_id=${inputData.app_id}`);

    // Check if a date is provided for historical data
    if (inputData.date) {
      apiUrl += `historical/${inputData.date}.json`;
    } else {
      apiUrl += 'latest.json';
    }

    // Optional parameters for the latest endpoint
    if (!inputData.date) {
      if (inputData.base) params.push(`base=${inputData.base}`);
      if (inputData.symbols) params.push(`symbols=${inputData.symbols}`);
      if (inputData.prettyprint) params.push(`prettyprint=${inputData.prettyprint}`);
      if (inputData.show_alternative) params.push(`show_alternative=${inputData.show_alternative}`);
    }

    // Finalize the API URL
    apiUrl += '?' + params.join('&');

    // Define the request object
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
