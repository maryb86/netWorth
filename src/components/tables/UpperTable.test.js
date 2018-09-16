import React from 'react';
import { shallow } from 'enzyme';
import UpperTable from './UpperTable';
import AccountsTable from './AccountsTable';

it('renders UpperTable without crashing', () => {
  const UpperTableWrapper = shallow(<UpperTable />);
  expect(UpperTableWrapper.find(".upper-table")).toHaveLength(1);
  expect(UpperTableWrapper.find(AccountsTable)).toHaveLength(1);
});