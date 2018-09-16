import React from 'react';
import { shallow } from 'enzyme';
import NetWorth from './NetWorth';
import CurrencyDropdown from './CurrencyDropdown';

it('renders currency dropdown component', () => {
  const NetworthWrapper = shallow(<NetWorth />);
  expect(NetworthWrapper.find(CurrencyDropdown)).toHaveLength(1);
});