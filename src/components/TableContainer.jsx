import React, { Component } from 'react';
import '../App.css';
import UpperTable from './tables/UpperTable';

class TotalNetWorth extends Component {
  render() {
    return (
      <div className="table-container">
        <UpperTable
          type="assets"
        />
        <UpperTable
          type="liabilities"
        />
      </div>
    );
  }
}

export default TotalNetWorth;
