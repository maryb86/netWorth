import React, { Component } from 'react';
import '../App.css';

class AccountsTable extends Component {

  _getBody() {
    const rows = this.props.accounts.map((account) => {
      return (
        <tr key={account.account}>
          <td key={0} className="account">{account.account}</td>
          {account.hasOwnProperty('monthlyPayment') ? <td key={1}>{account.monthlyPayment}</td> : null}
          <td key={2}>{account.interestRate}</td>
          <td key={3}>
            {new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"}).format(account.amount)}
          </td>
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
