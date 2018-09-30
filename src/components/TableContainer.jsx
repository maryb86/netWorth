import React, { Component } from 'react';
import '../App.css';
import UpperTable from './tables/UpperTable';

class TotalNetWorth extends Component {
  render() {
    return (
      <tbody className="table-container">
        <tr>
          <td colSpan="2" className="upper-table-container">
            <UpperTable
              type="assets"
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2" className="upper-table-container">
            <UpperTable
              type="liabilities"
            />
          </td>
        </tr>
      </tbody>
    );
  }
}

export default TotalNetWorth;
