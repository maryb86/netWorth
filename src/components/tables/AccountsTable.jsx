import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

class AccountsTable extends Component {

  _getBody() {
    const rows = this.props.accounts.map((account) => {
      return (
        <tr key={account.account}>
          <td key={account.account}>{account.account}</td>
          {account.monthlyPayment ? <td key={account.monthlyPayment}>{account.monthlyPayment}</td> : null}
          <td key={account.interestRate}>{account.interestRate}</td>
          <td key={account.amount}>{account.amount}</td>
        </tr>
      )
    })

    return rows;
  }

  _getHeader() {
    const headers = this.props.headers.map((header) => {
      return (
        <th key={header} scope="col">{header}</th>
      )
    });
    return headers;
  }

  render() {
    return (
      <table className="table accounts-table">
        <thead>
          <tr>
            {this._getHeader()}
          </tr>
        </thead>
          <tbody>
          {this._getBody()}
          </tbody>
      </table>
    );
  }
}

AccountsTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired, //MARYTODO: CREATE OWN PROPTYPE OBJ TO COMPARE AGAINST
}

export default AccountsTable;
