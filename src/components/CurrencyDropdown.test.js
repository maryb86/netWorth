import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import CurrencyDropdown from './CurrencyDropdown';

it('renders 10 currencies in a dropdown list', () => {
  const currencyDropdown = shallow(<CurrencyDropdown />);
  expect(currencyDropdown.find("a.dropdown-item")).toHaveLength(10);
});