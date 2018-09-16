import React from 'react';
import { shallow } from 'enzyme';
import NetWorth from './NetWorth';
import CurrencyDropdown from './CurrencyDropdown';
import TotalNetWorth from './TotalNetWorth';
import TableContainer from './TableContainer';

it('renders currency dropdown and total net worth', () => {
  const NetworthWrapper = shallow(<NetWorth />);
  expect(NetworthWrapper.find(CurrencyDropdown)).toHaveLength(1);
  expect(NetworthWrapper.find(TotalNetWorth)).toHaveLength(1);
  expect(NetworthWrapper.find(TableContainer)).toHaveLength(1);
});