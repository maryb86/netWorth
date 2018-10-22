import React, { Component } from 'react';
import '../App.css';
import CurrencyDropdown from './CurrencyDropdown';
import AccountsTable from './AccountsTable';
import accounts from '../store/accounts.js'
import accountHeaders from '../store/accountHeaders.js' //MARYTODO: MOVE TO MORE APPROPRIATE LOCATION
import {getBaseRate, getExchangeRate} from '../services/CurrencyService.js';
import {calcTotalForType, calcNetWorthTotal} from '../services/CalcService.js';

const currencies=["CAD", "USD", "MXN", "EUR", "GBP", "CHF", "SEK", "AUD", "CNY", "JPY"];

class NetWorth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currency: currencies[0],
      activeCurrency: "CAD",
      exchangeRate: 1,
      totalAssets: 0.00,
      totalLiabilities: 0.00,
      totalNetWorth: 0.00
    }
    this.handleCurrencySelect = this.handleCurrencySelect.bind(this); //MARYTODO: CAN THIS BE DONE WITH ARROW FUNCTIONS INSTEAD?
  }

  componentDidMount() {
    this._updateTotals();
  }

  _updateTotals() {
    debugger;
    Promise.all([
      this._getTotalAssets(),
      this._getTotalLiabilities(),
      this._getTotalNetWorth()
    ]).then((response) => {
      this.setState({
        totalAssets: response[0].total,
        totalLiabilities: response[1].total,
        totalNetWorth: response[2].total
      });
    });
  }

  _getRates() {
    return {baseRate: this.state.baseRate, rate: this.state.exchangeRate}
  }

  _getTotalAssets() {
    return calcTotalForType(accounts.assets, this._getRates());
  }

  _getTotalLiabilities() {
    return calcTotalForType(accounts.liabilities, this._getRates());
  }

  _getTotalNetWorth() {
    return calcNetWorthTotal(accounts, this._getRates())
  }

  //MARYTODO: ERROR HANDLING IN BOTH FUNCTIONS
  _getShortTermHeaders(type) {
    const headers = [accountHeaders[type].shortTerm].concat(accountHeaders[type].commonColumns);
    return headers.map((header) => {
      return (
        <th key={header}>{header}</th>
      )
    });
  }

  //MARYTODO: ERROR HANDLING IN BOTH FUNCTIONS
  _getLongTermHeaders(type) {
    const longTermHeaders = accountHeaders[type];

    return (
      <th key={longTermHeaders.longTerm} colSpan={longTermHeaders.commonColumns.length + 2}>
        {longTermHeaders.longTerm}
      </th>
    )
  }

  checkBaseRate() {
    if (this.state.baseRate) {
      return Promise.resolve(this.state.baseRate);
    } else {
      return getBaseRate();
    }
  }

  updateCurrency(currency, exchangeRate, baseRate){
    this.setState({
      activeCurrency: currency,
      exchangeRate: exchangeRate,
      baseRate: baseRate
    }, () => {
      this._updateTotals();
    });
  };

  handleCurrencySelect(eventKey) {
     //MARYTODO: HANDLE ERRORS, WRITE UNIT TESTS
    const currency = eventKey;
    let baseRate = this.state.baseRate
    if (currencies.includes(currency)) {
      this.checkBaseRate()
      .then((newBaseRate) => {
        baseRate = newBaseRate;
        return getExchangeRate(currency);
      })
      .then((exchangeRate) => {
        this.updateCurrency(currency, exchangeRate, baseRate);
      });
    }    
  };

  render() {
    //MARYTODO: SIMPLIFY headers obj MORE?
    //MARYTODO: MAKE COLSPAN MORE COMMON EVERYWHERE?
    const headers = {
      shortTermAssets: this._getShortTermHeaders("assets"),
      longTermAssets: this._getLongTermHeaders("assets"),
      shortTermLiabilities: this._getShortTermHeaders("liabilities"),
      longTermLiabilities: this._getLongTermHeaders("liabilities")
    }

    return (
      <div>
        <h2>Tracking your Networth</h2>
        <CurrencyDropdown 
          currencies={currencies} 
          activeCurrency={this.state.activeCurrency} 
          handleCurrencySelect={this.handleCurrencySelect}
        />
        <table className="table">
          <thead>
            <tr>
              <th>Net Worth</th>
              {/* MARYTODO: change locale when currency changes */}
              <th>{new Intl.NumberFormat("en-CA", {style: "currency", currency: this.state.activeCurrency})
                .format(this.state.totalNetWorth)}</th>
            </tr>
          </thead>
        </table>
        <table className="table">
          <thead>
            <tr>
              <th colSpan={accountHeaders.assets.commonColumns.length + 2}>{accountHeaders.assets.header}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {headers.shortTermAssets}
              <th></th>
            </tr>
          </tbody>
          <AccountsTable
            {...this.state}
            accounts={accounts.assets.shortTerm}
          />
          <tbody>
            <tr>
              {headers.longTermAssets}
            </tr>
          </tbody>
          <AccountsTable
            {...this.state}
            accounts={accounts.assets.longTerm}
          />
          <tfoot>
            <tr>
              <td colSpan={accountHeaders.assets.commonColumns.length + 1}>Total Assets</td>
              <td>{new Intl.NumberFormat("en-CA", {style: "currency", currency: this.state.activeCurrency})
                .format(this.state.totalAssets)}</td>
            </tr>
          </tfoot>
        </table>
        <table className="table">
          <thead>
            <tr>
              <th colSpan={accountHeaders.liabilities.commonColumns.length + 2}>{accountHeaders.liabilities.header}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {headers.shortTermLiabilities}
              <th></th>
            </tr>
          </tbody>
          <AccountsTable
            {...this.state}
            accounts={accounts.liabilities.shortTerm}
          />
          <tbody>
            <tr>
              {headers.longTermLiabilities}
            </tr>
          </tbody>
          <AccountsTable
              {...this.state}
              accounts={accounts.liabilities.longTerm}
            />
          <tfoot>
            <tr>
              <td colSpan={accountHeaders.assets.commonColumns.length + 2}>Total Liabilities</td>
              <td>{new Intl.NumberFormat("en-CA", {style: "currency", currency: this.state.activeCurrency})
                .format(this.state.totalLiabilities)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default NetWorth;
