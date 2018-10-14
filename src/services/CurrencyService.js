import config from "../config.js";

export function getExchangeRate(currency) {
    //MARYTODO: ERROR HANDLING
    //MARYTODO: INVESTIGATE NUMBERS BEING OFF WHEN LARGE AMOUNTS
    return new Promise((resolve) => {
        fetch(`http://data.fixer.io/api/latest?access_key=9571c54f89a73e563b9aeb1678987e5a&symbols=${currency}&format=1`)
        .then((currencyData) => {
          return currencyData.json();
        })
        .then((currencyData) => {
          resolve(currencyData.rates[currency]);
        });
    });
}

export function getBaseRate() {
    return new Promise((resolve) => {
        getExchangeRate(config.baseCurrency).then((rate) => {
            resolve(1/rate);
        })
    })
}
  
export default (
    getExchangeRate,
    getBaseRate
)