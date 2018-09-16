import React from 'react';
import { shallow } from 'enzyme';
import TotalNetWorth from './TotalNetWorth';

it('renders TotalNetWorth without crashing', () => {
  const TotalNetWorthWrapper = shallow(<TotalNetWorth />);
  expect(TotalNetWorthWrapper.find(".net-worth-total")).toHaveLength(1);
});