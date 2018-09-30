import React, { Component } from 'react';
import '../../App.css';
import AccountsTable from './AccountsTable';
import accounts from '../../store/accounts.js'
import accountHeaders from '../../store/accountHeaders.js' //MARYTODO: MOVE TO MORE APPROPRIATE LOCATION
import calcTotalForType from '../../util/calcUtil'


class UpperTable extends Component {

  _getHeaders(term, availableHeaders) {
    let headers = [availableHeaders[term]];
    if (term === "shortTerm") {
      headers = headers.concat(availableHeaders.commonColumns)
    }
    return headers;
  }

  render() {
    const type = this.props.type;
    const headers = accountHeaders[type];
    const shortTermHeaders = this._getHeaders("shortTerm", headers);
    const longTermHeaders = this._getHeaders("longTerm", headers);

    return (
      <table className="table">
        <thead>
          <tr>
            <th>{accountHeaders[type].header}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={shortTermHeaders.length + 1} className="accounts-table-container">
              <AccountsTable
                headers={shortTermHeaders}
                accounts={accounts[type].shortTerm}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={longTermHeaders.length + 1} className="accounts-table-container">
              <AccountsTable
                headers={longTermHeaders}
                accounts={accounts[type].longTerm}
              />
            </td>
          </tr>
        </tbody>
        <tfoot>
            <tr>
              <td>Total Assets</td>
              <td>{calcTotalForType(accounts[type])}</td>
            </tr>
        </tfoot>
      </table>
    );
  }
}

export default UpperTable;
