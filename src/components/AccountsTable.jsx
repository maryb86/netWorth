import React, { Component } from 'react';
import '../App.css';

class AccountsTable extends Component {

  _getBody() {
    const rows = this.props.accounts.map((account) => {
      return (
        <tr key={account.account}>
          <td key={account.account} className="account">{account.account}</td>
          {account.monthlyPayment ? <td key={account.monthlyPayment}>{account.monthlyPayment}</td> : null} 
          {/*MARYTODO: CONDITION ON TABLE TYPE ON SHOWING BLANK TD OR NO TD AT ALL */}
          <td key={account.interestRate}>{account.interestRate}</td>
          <td key={account.amount}>{account.amount}</td>
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
