import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class AccountsTable extends Component {

  static propTypes = {
    accounts: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired,
    handleSetAmount: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired
  }

  _formatNumber(number) {
    return new Intl.NumberFormat("en-CA", {style: "currency", currency: this.props.currency}).format(number);
  }

  _handleClick() {

  }

  _setAmount(accountId, amount) {
    this.props.handleSetAmount({
      type: this.props.type,
      term: this.props.term,
      id: accountId,
      amount: "500.00"
    });
  }

  _getAmountField(account) {
    return <td key={3} onClick={() => this._setAmount(account.id, "500.00")}>{this._formatNumber(account.amount)}</td>
  }

  _getBody() {
    const rows = this.props.accounts && this.props.accounts.map((account) => {
      return (
        <tr key={account.id}>
          <td key={0} className="account">{account.account}</td>
            {account.hasOwnProperty('monthlyPayment') ? 
            <td key={1}>{this._formatNumber(account.monthlyPayment)}</td> : null}
          <td key={2}>{account.interestRate}</td>
            {this._getAmountField(account)}
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
