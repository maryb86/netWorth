import React from 'react';
import { shallow } from 'enzyme';
import AccountsTable from './AccountsTable';
import accounts from '../../store/accounts.js'

let wrapper;
const account = {
  account: "Primary Income",
  interestRate: "1%", // MARYTODO: change to int and format with percent
  amount: "$455,000.00" //MARYTODO: change to int and format with currency
}
const headerText = "Unit test header",
 numCols = 3,
 tableSelector = ".accounts-table";

beforeEach(() => {
  wrapper = shallow(
    <AccountsTable
      header={headerText}
      numCols={3}
      accounts={{accountData:[account]}}
    />
  );
});

it('renders AccountsTable without crashing', () => {
  expect(wrapper.find(tableSelector)).toHaveLength(1);
  expect(wrapper.find(`${tableSelector} th`).text()).toEqual(headerText);
  expect(wrapper.find(`${tableSelector} tbody tr`).childAt(0).text()).toEqual(account.account);
  expect(wrapper.find(`${tableSelector} tbody tr`).childAt(1).text()).toEqual(account.interestRate);
  expect(wrapper.find(`${tableSelector} tbody tr`).childAt(2).text()).toEqual(account.amount);
});