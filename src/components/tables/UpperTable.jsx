import React, { Component } from 'react';
import '../../App.css';
import AccountsTable from './AccountsTable';

class UpperTable extends Component {
  render() {
    return (
      <div className="upper-table">
        <AccountsTable />
      </div>
    );
  }
}

export default UpperTable;
