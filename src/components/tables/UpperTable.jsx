import React, { Component } from 'react';
import '../../App.css';
import AccountsTable from './AccountsTable';
import accounts from '../../store/accounts.js'

class UpperTable extends Component {

  _getTotal(accounts) {
    const amounts = [0.00];
    let total = amounts[0];
    if (accounts) {
      Object.keys(accounts).forEach(account => {
        if (accounts[account]) {
          accounts[account].map((account) => {
            return account.amount ? amounts.push(parseFloat(account.amount)) : undefined;
          });
        }
      });

      if (amounts.length > 1){
        total = amounts.reduce((accumulator, currentValue) => accumulator + currentValue);
      }
    }

    return total.toFixed(2);
  }

  render() {
    return (
      <div className="upper-table">
        <table className="table">
          <thead>
            <tr>
              <th>Assets</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>
                <AccountsTable
                  headers={["Cash and Investments", "Interest Rate"]}
                  accounts={accounts.assets.cashAndInvestments}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <AccountsTable
                  headers={["Long Term Assets"]}
                  accounts={accounts.assets.longTermAssets}
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
              <tr>
                <td>Total Assets</td>
                <td>{this._getTotal(accounts.assets)}</td>
              </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default UpperTable;
