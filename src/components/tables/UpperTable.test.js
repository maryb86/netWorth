import React from 'react';
import { shallow } from 'enzyme';
import UpperTable from './UpperTable';
import AccountsTable from './AccountsTable';

let wrapper;
const accounts = {
    cash: [{amount: "100.00"},{amount: "200.00"}],
    assets: [{amount: "300.00"},{amount: "400.00"}]
};

beforeEach(() => {
  wrapper = shallow(
    <UpperTable />
  );
});

it('renders UpperTable without crashing', () => {
  expect(wrapper.find(".upper-table")).toHaveLength(1);
  expect(wrapper.find(AccountsTable)).toHaveLength(2);
});

it('returns total of all accounts when one set provided', () => {
  const instance = wrapper.instance();
  expect(instance._getTotal({cash: accounts.cash})).toEqual("300.00");
});

it('returns total of all accounts when multiple sets provided', () => {
  const instance = wrapper.instance();
  expect(instance._getTotal(accounts)).toEqual("1000.00");
});

it('returns total of 0.00 when no accounts provided', () => {
  const instance = wrapper.instance();
  expect(instance._getTotal()).toEqual("0.00");
});

it('ignores accounts without amounts', () => {
  const instance = wrapper.instance();
  expect(instance._getTotal({cash: [{}]})).toEqual("0.00");
  expect(instance._getTotal({cash: [{amount: "100.00"},{}]})).toEqual("100.00");
});