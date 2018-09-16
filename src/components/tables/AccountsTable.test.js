import React from 'react';
import { shallow } from 'enzyme';
import AccountsTable from './AccountsTable';
import accounts from '../../store/accounts.js'

let AccountsTableWrapper;

beforeEach(() => {
  AccountsTableWrapper = shallow(
    <AccountsTable
      accounts={accounts}
    />
  );
});

it('renders AccountsTable without crashing', () => {
 // const AccountsTableWrapper = shallow(<AccountsTable />);
  expect(AccountsTableWrapper.find(".accounts-table")).toHaveLength(1);
});