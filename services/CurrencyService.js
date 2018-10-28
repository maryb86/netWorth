const defaultCurrency = "CAD";

exports.getExchangeRate = function(currency=defaultCurrency) {
    return new Promise((resolve) => {
        const fetch = require('node-fetch');
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

exports.getBaseRate = (() => {
    return new Promise((resolve) => {
        this.getExchangeRate(this.defaultCurrency).then((rate) => {
            if (!Number.isNaN(rate) && rate >= 0) {
                resolve(1/rate);
            } else {
                rejects(`Invalid base rate`);
            }
        })
    })
});