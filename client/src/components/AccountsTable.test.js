import React from 'react';
import { shallow } from 'enzyme';
import AccountsTable from './AccountsTable';

let wrapper;
const account = [{
      account: "Chequing",
      interestRate: "1%",
      amount: "1000.00"
}];
const tableSelector = ".accounts-table";
const getFormattedAmount = ((amount, currency) => {
  return new Intl.NumberFormat("en-CA", {minimumFractionDigits: 2}).format(amount);
})

beforeEach(() => {
  wrapper = shallow(
    <AccountsTable
      currency="CAD"
      accounts={account}
      baseRate={1}
      exchangeRate={1}
    />
  );
});

it('renders AccountsTable without crashing', () => {
  const rows = wrapper.find(`${tableSelector} tr`);

  expect(wrapper.find(tableSelector)).toHaveLength(1);
  expect(rows.childAt(0).text()).toEqual(account[0].account);
  expect(rows.childAt(1).text()).toEqual(account[0].interestRate);
  expect(rows.childAt(2).text()).toEqual(getFormattedAmount(account[0].amount));
});

it('still renders fields when values are empty', () => {
  wrapper.setProps({accounts: [{
    account: "",
    interestRate: "",
    amount: ""
  }]});

  const rows = wrapper.find(`${tableSelector} tr`);

  expect(wrapper.find(tableSelector)).toHaveLength(1);
  expect(rows.childAt(0).text()).toBeEmpty;
  expect(rows.childAt(1).text()).toBeEmpty;
  expect(rows.childAt(2).text()).toBeEmpty;
});

it('renders monthly payment column if it exists', () => {
  const monthlyPayment = "100.00";
  const accountWithMonthly = [Object.assign({monthlyPayment: monthlyPayment}, account[0])];

  wrapper.setProps({accounts: accountWithMonthly});
  const rows = wrapper.find(`${tableSelector} tr`);

  expect(rows.childAt(0).text()).toEqual(accountWithMonthly[0].account);
  expect(rows.childAt(1).text()).toEqual(getFormattedAmount(accountWithMonthly[0].monthlyPayment));
  expect(rows.childAt(2).text()).toEqual(accountWithMonthly[0].interestRate);
  expect(rows.childAt(3).text()).toEqual(getFormattedAmount(account[0].amount));
});