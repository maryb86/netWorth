import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'react-bootstrap';
import CurrencyDropdown from './CurrencyDropdown';

const currencies=["CAD", "USD", "MXN", "EUR", "GBP", "CHF", "SEK", "AUD", "CNY", "YEN"];
let currencyDropdownWrapper;
const handleCurrencySelect = () => {};

beforeEach(() => {
  currencyDropdownWrapper = shallow(
    <CurrencyDropdown 
      currencies={currencies} 
      activeCurrency="CAD"
      handleCurrencySelect={handleCurrencySelect}
    />
  );
})


it('renders 10 currencies in a dropdown list', () => {
  expect(currencyDropdownWrapper.find(MenuItem)).toHaveLength(10);
});
