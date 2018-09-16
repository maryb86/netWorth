import React, { Component } from 'react';
import '../App.css';
import UpperTable from './tables/UpperTable';

class TotalNetWorth extends Component {
  render() {
    return (
      <div className="table-container">
        <UpperTable />
      </div>
    );
  }
}

export default TotalNetWorth;
