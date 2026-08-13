// quote.mjs
// Page logic for the Get a Quote page.
// Populates the product and currency dropdowns, then recalculates
// and displays the converted price any time either dropdown changes.

import {
    getSupportedCurrencies,
    getExchangeRate
} from "./currency-service.mjs";

const productSelect = document.querySelector("#product-select");
const currencySelect = document.querySelector("#currency-select");
const resultDisplay = document.querySelector("#quote-result");

let products = [];

// Load product tiers from local JSON and fill the product dropdown.
async function loadProducts() {
    const response = await fetch("./data/products.json");
    products = await response.json();

    products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = `${product.name} — $${product.basePriceUSD.toLocaleString()}`;
        productSelect.appendChild(option);
    });
}

// Load supported currencies from Frankfurter and fill the currency dropdown.
async function loadCurrencies() {
    try {
        const currencies = await getSupportedCurrencies();
        // currencies looks like { "USD": "United States Dollar", "EUR": "Euro", ... }
        Object.entries(currencies).forEach(([code, name]) => {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = `${code} — ${name}`;
            currencySelect.appendChild(option);
        });
    } catch (error) {
        resultDisplay.textContent = "Currency list could not be loaded. Please try again later.";
        console.error(error);
    }
}

// Recalculate and display the quote based on current dropdown selections.
async function updateQuote() {
    const selectedProduct = products.find((p) => p.id === productSelect.value);
    const selectedCurrency = currencySelect.value;

    if (!selectedProduct || !selectedCurrency) {
        return;
    }

    resultDisplay.textContent = "Calculating...";

    try {
        // USD prices convert directly against USD, so if the target
        // currency IS USD, skip the fetch and just show the base price.
        if (selectedCurrency === "USD") {
            resultDisplay.textContent =
                `${selectedProduct.name}: $${selectedProduct.basePriceUSD.toLocaleString()} USD`;
            return;
        }

        const rate = await getExchangeRate(selectedCurrency);
        const convertedPrice = selectedProduct.basePriceUSD * rate;

        resultDisplay.textContent =
            `${selectedProduct.name}: ${convertedPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${selectedCurrency}`;
    } catch (error) {
        resultDisplay.textContent = "Could not fetch exchange rate. Please try again.";
        console.error(error);
    }
}

// Wire up listeners so any dropdown change triggers a live recalculation.
productSelect.addEventListener("change", updateQuote);
currencySelect.addEventListener("change", updateQuote);

// Initial load
await loadProducts();
await loadCurrencies();
