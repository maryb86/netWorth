import React from 'react';
import { shallow } from 'enzyme';
import NetWorth from './NetWorth';
import CurrencyDropdown from './CurrencyDropdown';
import AccountsTable from './AccountsTable';

it('renders currency dropdown and tables', () => {
  const NetworthWrapper = shallow(<NetWorth />);
  expect(NetworthWrapper.find(CurrencyDropdown)).toHaveLength(1);
  expect(NetworthWrapper.find(AccountsTable)).toHaveLength(4);
  expect(NetworthWrapper.find(".table")).toHaveLength(3);
});