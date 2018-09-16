import React, { Component } from 'react';
import '../App.css';
import CurrencyDropdown from './CurrencyDropdown';
import TotalNetWorth from './TotalNetWorth';
import TableContainer from './TableContainer';

class NetWorth extends Component {
  render() {
    return (
      <div>
        <CurrencyDropdown />
        <TotalNetWorth />
        <TableContainer />
      </div>
    );
  }
}

export default NetWorth;
