import React from 'react';
import { shallow } from 'enzyme';
import AccountsTable from './AccountsTable';
import accounts from '../../store/accounts.js'

let wrapper;
const account = [{
      account: "Chequing",
      interestRate: "1%", // MARYTODO: change to int and format with percent
      amount: "$1,000.00" //MARYTODO: change to int and format with currency
}];
const headerText = ["Unit test header"],
 tableSelector = ".accounts-table";

beforeEach(() => {
  wrapper = shallow(
    <AccountsTable
      headers={headerText}
      accounts={account}
    />
  );
});

it('renders AccountsTable without crashing', () => {
  expect(wrapper.find(tableSelector)).toHaveLength(1);
  expect(wrapper.find(`${tableSelector} th`).text()).toEqual(headerText[0]);
  expect(wrapper.find(`${tableSelector} tbody tr`).childAt(0).text()).toEqual(account[0].account);
  expect(wrapper.find(`${tableSelector} tbody tr`).childAt(1).text()).toEqual(account[0].interestRate);
  expect(wrapper.find(`${tableSelector} tbody tr`).childAt(2).text()).toEqual(account[0].amount);
});