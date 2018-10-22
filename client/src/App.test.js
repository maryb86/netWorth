import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import NetWorth from './components/NetWorth';

it('renders net worth component without crashing', () => {
  const AppWrapper = shallow(<App />);
  expect(AppWrapper.find(NetWorth)).toHaveLength(1);
  expect(AppWrapper.find(".App")).toHaveLength(1);
});
