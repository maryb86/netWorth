import React, { Component } from 'react';
import '../App.css';
import CurrencyDropdown from './CurrencyDropdown';
import TotalNetWorth from './TotalNetWorth';
import TableContainer from './TableContainer';
import accounts from '../store/accounts.js'

class NetWorth extends Component {
  render() {
    return (
      <div>
        <h2>Tracking your Networth</h2>
        <CurrencyDropdown />
        <table className="table">
          <thead>
              <tr>
                <th>Net Worth</th>
                <th className="net-worth">
                  <TotalNetWorth accounts={accounts}/>
                </th>
              </tr>
            </thead>
            <TableContainer />
        </table>
      </div>
    );
  }
}

export default NetWorth;
