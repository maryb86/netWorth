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
  const rows = wrapper.find(`${tableSelector} tbody tr`);

  expect(wrapper.find(tableSelector)).toHaveLength(1);
  expect(wrapper.find(`${tableSelector} th`).text()).toEqual(headerText[0]);
  expect(rows.childAt(0).text()).toEqual(account[0].account);
  expect(rows.childAt(1).text()).toEqual(account[0].interestRate);
  expect(rows.childAt(2).text()).toEqual(account[0].amount);
});

it('displays monthly payment column if it exists', () => {
  const monthlyPayment = "100.00";
  const accountWithMonthly = [Object.assign({monthlyPayment: monthlyPayment}, account[0])];

  wrapper.setProps({ accounts: accountWithMonthly });
  const rows = wrapper.find(`${tableSelector} tbody tr`);

  expect(rows.childAt(0).text()).toEqual(accountWithMonthly[0].account);
  expect(rows.childAt(1).text()).toEqual(accountWithMonthly[0].monthlyPayment);
  expect(rows.childAt(2).text()).toEqual(accountWithMonthly[0].interestRate);
  expect(rows.childAt(3).text()).toEqual(accountWithMonthly[0].amount);
});