import config from "../config.js";
import { rejects } from "assert";

export function getExchangeRate(currency="CAD") {
    return new Promise((resolve) => {
        fetch(`http://data.fixer.io/api/latest?access_key=9571c54f89a73e563b9aeb1678987e5a&symbols=${currency}&format=1`)
        .then((currencyData) => {
          return currencyData.json();
        })
        .then((currencyData) => {
            if (currencyData && currencyData.rates && currencyData.rates[currency]) {
                resolve(currencyData.rates[currency]);
            } else {
                resolve(1);
            }
        })
        .catch((error) => {
            console.error(`Failed to fetch currency data, error: ${error}`)
            resolve(1);
        });
    });
}

export function getBaseRate() {
    return new Promise((resolve) => {
        getExchangeRate(config.baseCurrency).then((rate) => {
            if (!Number.isNaN(rate) && rate >= 0) {
                resolve(1/rate);
            } else {
                rejects(`Invalid base rate`);
            }
        })
    })
}
  
export default (
    getExchangeRate,
    getBaseRate
)