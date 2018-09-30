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
    <UpperTable
      type="assets"
    />
  );
});

it('renders UpperTable without crashing', () => {
  expect(wrapper.find("table.table")).toHaveLength(1);
  expect(wrapper.find(AccountsTable)).toHaveLength(2);
});