'use strict';

const calcUtil = require('./util/calcUtil');
const accounts = require('./data/accounts');
const currencyService = require('./services/CurrencyService.js');

class NetWorthData {

    constructor() {
        this.activeCurrency = "CAD";

        // create baseAccountData obj to store data in memory with totals and currency
        this.baseAccountData = accounts;
        this._setBaseAccountTotals();
        this.baseAccountData = Object.assign(this.baseAccountData, {currency: this.activeCurrency})
    
        // deep copy baseAccountData to new obj which will transform when currency is updated
        this._setConvertedWithBaseAccountData();
    }

    _calcTotalAssets(accountData) {
        return calcUtil.calcTotalForType(accountData.assets);
    }

    _calcTotalLiabilities(accountData) {
        return calcUtil.calcTotalForType(accountData.liabilities);
    }

    _calcTotalNetWorth(accountData) {
        return calcUtil.calcNetWorthTotal(accountData);
    }

    _setConvertedWithBaseAccountData() {
        this.convertedAccountData = JSON.parse(JSON.stringify(this.baseAccountData));
    }

    _setBaseAccountTotals() {
        this.baseAccountData.totals = {
            assets: this._calcTotalAssets(this.baseAccountData.accounts),
            liabilities: this._calcTotalLiabilities(this.baseAccountData.accounts),
            netWorth: this._calcTotalNetWorth(this.baseAccountData.accounts)
        }
    }

    _setBaseRate() {
        if (this.baseRate) {
            return Promise.resolve();
        } else {
            return currencyService.getBaseRate().then((baseRate) => {
                this.baseRate = baseRate;
            });
        }
    }

    _setExchangeRate(currency) {
        return currencyService.getExchangeRate(currency).then((exchangeRate) => {
            this.exchangeRate = exchangeRate;
        });
    }

    _setConvertedAccounts(type, rates) {
        if (type !== "assets" && type !== "liabilities") {
            console.error(`Cannot convert account type ${type}. Only assets and liabilities supported`);
        } else {
            Object.keys(this.baseAccountData.accounts[type]).forEach(account => {
                const newAccounts = this._convertAmounts(this.baseAccountData.accounts[type][account], rates);
                this.convertedAccountData.accounts[type][account] = newAccounts;
            });
        }
    }

    _validateAmount(amount) {
        const parsed = parseFloat(amount);
        if (parsed < 0.00) {
            throw new Error(`Amount ${amount} is not positive. All amounts, including liabilities, should be positive.`)
        } else {
            return true;
        }
    }

    _convertAmounts(accountsArray, rates) {
        return accountsArray.map((account) => {
            const convertedAmounts = {};
            if (account.amount && this._validateAmount(account.amount)) {
                convertedAmounts.amount = calcUtil.convert(account.amount, rates).toFixed(2);
            }
            if (account.monthlyPayment && this._validateAmount(account.convertedMonthlyPayment)) {
                convertedAmounts.monthlyPayment = calcUtil.convert(account.monthlyPayment, rates).toFixed(2);
            }
            return Object.assign({}, account, convertedAmounts);
        });
    }

    _setConvertedTotals(rates) {
        this.convertedAccountData.totals = {
            assets: calcUtil.convert(this.baseAccountData.totals.assets, rates).toFixed(2),
            liabilities: calcUtil.convert(this.baseAccountData.totals.liabilities, rates).toFixed(2),
            netWorth: calcUtil.convert(this.baseAccountData.totals.netWorth, rates).toFixed(2)
        }
    }

    _setConvertedAccountData() {
        const rates = {baseRate: this.baseRate, rate: this.exchangeRate};
        this._setConvertedAccounts("assets", rates);
        this._setConvertedAccounts("liabilities", rates);
        this._setConvertedTotals(rates);
        // Set currency of data to identify it's been updated to match currency selected
        this.convertedAccountData.currency = this.activeCurrency; 
    }

    getAccountData() {
        if (this.activeCurrency === this.convertedAccountData.currency) {
            return this.convertedAccountData;
        } else {
            this._setConvertedAccountData();
            return this.convertedAccountData;
        }
    }

    setCurrency(currency) {
        if (this.activeCurrency !== currency) {
            return this._setBaseRate()
            .then(() => {
                return this._setExchangeRate(currency)
            })
            .then(() => {
                this.activeCurrency = currency;
                return this.getAccountData();
            })
            .catch((error) => {
                console.error(`Error when setting exchange rates: ${error}`);
            });
        } else {
            return this.getAccountData();
        }
    }

    setAmount(accountData) {
        if (this.activeCurrency === "CAD") {
            return new Promise((resolve, reject) => {
                if (!accountData || !accountData.type || !accountData.term || !accountData.id || !accountData.amount) {
                    reject(console.error("accountData obj must contain: type, term, id, amount"));
                }

                const accounts = this.baseAccountData.accounts &&
                    this.baseAccountData.accounts[accountData.type] &&
                    this.baseAccountData.accounts[accountData.type][accountData.term];
                const accountIndex = accounts.findIndex((account) => {;
                    return account.id === accountData.id;
                })
                if (accountIndex === -1) {
                    reject(console.error(`Could not find account to update with data: ${accountData}`));
                }

                this.baseAccountData.accounts[accountData.type][accountData.term][accountIndex].amount = accountData.amount;
                this._setBaseAccountTotals(); // update totals of base account data
                this._setConvertedWithBaseAccountData(); // update converted account data to match
                resolve(this.getAccountData());
            })
        } else {
            console.error("Currency must be CAD to edit amounts");
        }
    }
}
module.exports = NetWorthData;