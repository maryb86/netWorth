import React from 'react';
import { shallow } from 'enzyme';
import AccountsTable from './AccountsTable';

it('renders AccountsTable without crashing', () => {
  const AccountsTableWrapper = shallow(<AccountsTable />);
  expect(AccountsTableWrapper.find(".accounts-table")).toHaveLength(1);
});