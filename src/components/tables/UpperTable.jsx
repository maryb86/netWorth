import React, { Component } from 'react';
import '../../App.css';
import AccountsTable from './AccountsTable';
import accounts from '../../store/accounts.js'

class UpperTable extends Component {
  render() {
    return (
      <div className="upper-table">
        <AccountsTable
          header={"Long Term Assets"}
          numCols={3}
          accounts={accounts}
        />
      </div>
    );
  }
}

export default UpperTable;
