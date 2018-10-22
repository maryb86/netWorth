import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class CurrencyDropdown extends Component {

  static propTypes = {
    activeCurrency: PropTypes.string.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleCurrencySelect: PropTypes.func.isRequired
  }

  _getMenuItems(activeCurrency) {
    return this.props.currencies.map((currency) => {
      const isActive = currency === activeCurrency;
      if (isActive) {
        return <MenuItem onSelect={this.props.handleCurrencySelect} eventKey={currency} key={currency} bsStyle="default" active>{currency}</MenuItem>
      }
      return <MenuItem onSelect={this.props.handleCurrencySelect} eventKey={currency} key={currency} bsStyle="default">{currency}</MenuItem>
    });
  }

  render() {
    return (
      <DropdownButton title="Currency" id="currency-dropdown">
        {this._getMenuItems(this.props.activeCurrency)}
      </DropdownButton>
    );
  }
}

export default CurrencyDropdown;
