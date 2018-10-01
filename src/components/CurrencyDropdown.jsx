import React, { Component } from 'react';
import '../App.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const currencies=["CAD", "USD", "MXN", "EUR", "GBP", "CHF", "SEK", "AUD", "CNY", "YEN"];

class CurrencyDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeCurrency: currencies[0]
    }
  }

  _getMenuItems(activeCurrency) {
    return currencies.map((currency) => {
      const isActive = currency === activeCurrency;
      if (isActive) {
        return <MenuItem eventKey={currency} key={currency} bsStyle="default" active>{currency}</MenuItem>
      }
      return <MenuItem eventKey={currency} key={currency} bsStyle="default">{currency}</MenuItem>
    });
  }

  render() {
    return (
      <DropdownButton title="Currency" id="currency-dropdown">
        {this._getMenuItems(this.state.activeCurrency)}
      </DropdownButton>
    );
  }
}

export default CurrencyDropdown;
