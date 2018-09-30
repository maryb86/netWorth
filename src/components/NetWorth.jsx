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
        <CurrencyDropdown />
        <TotalNetWorth accounts={accounts}/>
        <TableContainer />
      </div>
    );
  }
}

export default NetWorth;
