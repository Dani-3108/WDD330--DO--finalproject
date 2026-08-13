// currency-service.mjs
// Handles all communication with the Frankfurter exchange rate API.
// Two endpoints are used here:
//   1. /v1/currencies  -> list of supported currency codes + names
//   2. /v1/latest      -> live exchange rate for a chosen currency pair

const BASE_URL = "https://api.frankfurter.dev/v1";

// Endpoint 1: get the full list of supported currencies.
// Returns an object like { "USD": "United States Dollar", "EUR": "Euro", ... }
export async function getSupportedCurrencies() {
    const response = await fetch(`${BASE_URL}/currencies`);
    if (!response.ok) {
        throw new Error(`Currency list request failed: ${response.status}`);
    }
    return response.json();
}

// Endpoint 2: get the live exchange rate from USD to a target currency.
// Returns a number (the rate), e.g. getExchangeRate("EUR") -> 0.93
export async function getExchangeRate(targetCurrency) {
    const response = await fetch(
        `${BASE_URL}/latest?base=USD&symbols=${targetCurrency}`
    );
    if (!response.ok) {
        throw new Error(`Exchange rate request failed: ${response.status}`);
    }
    const data = await response.json();
    return data.rates[targetCurrency];
}
