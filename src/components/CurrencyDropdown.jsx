import React, { Component } from 'react';
import '../App.css';

class CurrencyDropdown extends Component {
  render() {
    return (
      <div className="currency-dropdown">
        <div className="btn-group">
            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Currency
            </button>
            <div className="dropdown-menu">
                {/* MARYTODO: IMPORT LIST OF CURRENCIES, LOOP TO RENDER */}
                <a className="dropdown-item" href="#">CAD</a> {/* Canadian Dollar */}
                <a className="dropdown-item" href="#">USD</a> {/* American Dollar */}
                <a className="dropdown-item" href="#">MXN</a> {/* Mexican Peso */}
                <a className="dropdown-item" href="#">EUR</a> {/* Euro */}
                <a className="dropdown-item" href="#">GBP</a> {/* British Pound */}
                <a className="dropdown-item" href="#">CHF</a> {/* Swiss Franc */}
                <a className="dropdown-item" href="#">SEK</a> {/* Swedish Krona */}
                <a className="dropdown-item" href="#">AUD</a> {/* Australian Dollar */}
                <a className="dropdown-item" href="#">CNY</a> {/* Chinese Yuan */}
                <a className="dropdown-item" href="#">YEN</a> {/* Japanese Yen */}
            </div>
        </div>
      </div>
    );
  }
}

export default CurrencyDropdown;
