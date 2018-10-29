import React, { Component } from 'react';
import '../App.css';
import CurrencyDropdown from './CurrencyDropdown';
import AccountsTable from './AccountsTable';
import accountHeaders from './accountHeaders.js'
import {getData, setCurrency, setAmount} from '../services/NetWorthService.js';

const currencies=["CAD", "USD", "MXN", "EUR", "GBP", "CHF", "SEK", "AUD", "CNY", "JPY"];

class NetWorth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accountData: {
        accounts: {
          assets: {
            shortTerm: [],
            longTerm: []
          },
          liabilities: {
            shortTerm: [],
            longTerm: []
          }
        },
        totals: {
          assets: "0.00",
          liabilities: "0.00",
          netWorth: "0.00"
        },
        currency: currencies[0]
      }
    }
  }

  componentDidMount() {
    getData().then((data) => {
      this.setState({
        accountData: data,
        editable: data.currency === currencies[0]
      })
    });
  }

  componentDidUpdate(prevProps, previousState) {
    if (previousState.accountData.currency !== this.state.accountData.currency) {
      this.setState({
        editable: this.state.accountData.currency === currencies[0]
      })
    }
  }

  _getShortTermHeaders(type) {
    const headers = [accountHeaders[type].shortTerm].concat(accountHeaders[type].commonColumns);
    return headers.map((header) => {
      return (
        <th key={header}>{header}</th>
      )
    });
  }

  _getLongTermHeaders(type) {
    const longTermHeaders = accountHeaders[type];
    return (
      <th key={longTermHeaders.longTerm} colSpan={longTermHeaders.commonColumns.length + 2}>
        {longTermHeaders.longTerm}
      </th>
    )
  }

  handleCurrencySelect = ((eventKey) => {
    const currency = eventKey;
    if (currencies.includes(currency)) {
      setCurrency(currency).then((data) => {
        this.setState({
          accountData: data
        });
      });
    } else {
      console.error(`Invalid currency selected: ${currency}. Must be one of ${currencies.toString()}`)
    }
  })

  handleSetAmount = ((newAccountData) => {
    console.log(newAccountData);
    if (this.state.accountData.currency !== currencies[0]) {
      return console.error("Set currency to CAD before updating amounts");
    }
    setAmount(newAccountData).then((data) => {
      this.setState({
        accountData: data
      });
    })
  });

  _formatNumber(number) {
    return new Intl.NumberFormat("en-CA", {style: "currency", currency: this.state.accountData.currency}).format(number);
  }

  render() {
    const headers = {
      shortTermAssets: this._getShortTermHeaders("assets"),
      longTermAssets: this._getLongTermHeaders("assets"),
      shortTermLiabilities: this._getShortTermHeaders("liabilities"),
      longTermLiabilities: this._getLongTermHeaders("liabilities")
    }

    //marytodo: re-use the header names better? Maybe function that sets it all up for <AccountsTable />
    return (
      <div>
        <h2>Tracking your Networth</h2>
        <CurrencyDropdown 
          currencies={currencies} 
          activeCurrency={this.state.accountData.currency} 
          handleCurrencySelect={this.handleCurrencySelect}
        />
        <table className="table">
          <thead>
            <tr>
              <th>Net Worth</th>
              <th>{this._formatNumber(this.state.accountData.totals.netWorth)}</th>
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
            editable={this.state.editable}
            currency={this.state.accountData.currency}
            type={"assets"}
            term={"shortTerm"}
            accounts={this.state.accountData.accounts.assets.shortTerm}
            handleSetAmount={this.handleSetAmount}
          />
          <tbody>
            <tr>
              {headers.longTermAssets}
            </tr>
          </tbody>
          <AccountsTable
            editable={this.state.editable}
            currency={this.state.accountData.currency}
            type={"assets"}
            term={"longTerm"}
            accounts={this.state.accountData.accounts.assets.longTerm}
            handleSetAmount={this.handleSetAmount}
          />
          <tfoot>
            <tr>
              <td colSpan={accountHeaders.assets.commonColumns.length + 1}>Total Assets</td>
              <td>{this._formatNumber(this.state.accountData.totals.assets)}</td>
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
            editable={this.state.editable}
            currency={this.state.accountData.currency}
            type={"liabilities"}
            term={"shortTerm"}
            accounts={this.state.accountData.accounts.liabilities.shortTerm}
            handleSetAmount={this.handleSetAmount}
          />
          <tbody>
            <tr>
              {headers.longTermLiabilities}
            </tr>
          </tbody>
          <AccountsTable
              editable={this.state.editable}
              currency={this.state.accountData.currency}
              type={"liabilities"}
              term={"longTerm"}
              accounts={this.state.accountData.accounts.liabilities.longTerm}
              handleSetAmount={this.handleSetAmount}
            />
          <tfoot>
            <tr>
              <td colSpan={accountHeaders.assets.commonColumns.length + 2}>Total Liabilities</td>
              <td>{this._formatNumber(this.state.accountData.totals.liabilities)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default NetWorth;
