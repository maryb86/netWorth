import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from 'react-bootstrap';
import CurrencyDropdown from './CurrencyDropdown';

it('renders 10 currencies in a dropdown list', () => {
  const currencyDropdown = shallow(<CurrencyDropdown />);
  expect(currencyDropdown.find(MenuItem)).toHaveLength(10);
});

it('defaults active currency to CAD', () => {
  const currencyDropdown = shallow(<CurrencyDropdown />);
  expect(currencyDropdown.find(MenuItem).first().props().children).toEqual("CAD");
});
