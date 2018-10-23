import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import {convert} from '../util/calcUtil.js';

class AccountsTable extends Component {

  static propTypes = {
    baseRate: PropTypes.number.isRequired,
    exchangeRate: PropTypes.number.isRequired,
    accounts: PropTypes.array.isRequired
  }

  _formatNumber(number) {
    const convertedNumber = convert(
      number, 
      {baseRate: this.props.baseRate, rate: this.props.exchangeRate}
    ).toFixed(2);
    return new Intl.NumberFormat("en-CA", {minimumFractionDigits: 2}).format(convertedNumber);
  }

  _getBody() {
    const rows = this.props.accounts.map((account) => {
      return (
        <tr key={account.account}>
          <td key={0} className="account">{account.account}</td>
            {account.hasOwnProperty('monthlyPayment') ? 
            <td key={1}>{this._formatNumber(account.monthlyPayment)}</td> : null}
          <td key={2}>{account.interestRate}</td>
          <td key={3}>{this._formatNumber(account.amount)}</td>
        </tr>
      )
    })

    return rows;
  }

  render() {
    return (
      <tbody className="accounts-table">
          {this._getBody()}
      </tbody>
    );
  }
}

export default AccountsTable;
