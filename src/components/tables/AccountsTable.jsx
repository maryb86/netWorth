import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

class AccountsTable extends Component {

  PropTypes = {
    header: PropTypes.string.isRequired,
    numCols: PropTypes.number.isRequired,
    accounts: PropTypes.object.isRequired, //MARYTODO: CREATE OWN PROPTYPE OBJ TO COMPARE AGAINST
  }

  _getBody() {
    const rows = this.props.accounts.accountData.map((account) => {
      return (
        //MARYTODO: HOW TO PROPERLY ASSIGN
        <tr key={account.account}>
          <td key={account.account}>{account.account}</td>
          <td key={account.interestRate}>{account.interestRate}</td>
          <td key={account.amount}>{account.amount}</td>
        </tr>
      )
    })

    return rows;
  }

  render() {
    return (
      <table className="table accounts-table">
        <thead>
          <tr>
            <th scope="col" colSpan={this.props.numCols}>{this.props.header}</th>
          </tr>
        </thead>
          <tbody>
          {this._getBody()}
          </tbody>
      </table>
    );
  }
}

export default AccountsTable;
