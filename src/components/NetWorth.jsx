import React, { Component } from 'react';
import '../App.css';
import CurrencyDropdown from './CurrencyDropdown';
import AccountsTable from './AccountsTable';
import {calcTotalForType, calcNetWorthTotal} from '../util/calcUtil'
import accounts from '../store/accounts.js'
import accountHeaders from '../store/accountHeaders.js' //MARYTODO: MOVE TO MORE APPROPRIATE LOCATION

const currencies=["CAD", "USD", "MXN", "EUR", "GBP", "CHF", "SEK", "AUD", "CNY", "YEN"];

class NetWorth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currency: currencies[0],
      activeCurrency: "CAD"
    }
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

  handleCurrencySelect(eventKey) {
    if (currencies.includes(eventKey)) {
      //BASE IS EURO (FREE VERSION OF SERVICE)
      fetch(`http://data.fixer.io/api/latest?access_key=9571c54f89a73e563b9aeb1678987e5a&symbols=${eventKey}&format=1`)
        .then(function(currencyData) {
          return currencyData.json();
        })
        .then(function(currencyData) {
          console.log(currencyData.rates[eventKey]);

        });
    }
  }

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
              <th>{new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"}).format(calcNetWorthTotal(accounts))}</th>
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
              accounts={accounts.assets.shortTerm}
          />
          <tbody>
            <tr>
              {headers.longTermAssets}
            </tr>
          </tbody>
          <AccountsTable
              accounts={accounts.assets.longTerm}
          />
          <tfoot>
            <tr>
              <td colSpan={accountHeaders.assets.commonColumns.length + 1}>Total Assets</td>
              <td>{new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"}).format(calcTotalForType(accounts.assets))}</td>
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
            accounts={accounts.liabilities.shortTerm}
          />
          <tbody>
            <tr>
              {headers.longTermLiabilities}
            </tr>
          </tbody>
          <AccountsTable
              accounts={accounts.liabilities.longTerm}
            />
          <tfoot>
            <tr>
              <td colSpan={accountHeaders.assets.commonColumns.length + 2}>Total Liabilities</td>
              <td>{new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"}).format(calcTotalForType(accounts.liabilities))}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default NetWorth;
