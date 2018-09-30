import React from 'react';
import { shallow } from 'enzyme';
import TotalNetWorth from './TotalNetWorth';

const accounts = { //MARYTODO: MOVE OUT INTO SEPARATE FILE
  assets: {
    cash: [{amount: "100.00"},{amount: "200.00"}],
    assets: [{amount: "300.00"},{amount: "400.00"}]
  },
  liabilities: {
    shortTerm: [{amount: "50.00"},{amount: "60.00"}],
  }
};

it('renders TotalNetWorth without crashing', () => {
  const TotalNetWorthWrapper = shallow(<TotalNetWorth accounts={accounts} />);
  
  expect(TotalNetWorthWrapper.find(".net-worth-total")).toHaveLength(1);
  expect(TotalNetWorthWrapper.find(".net-worth-total").text()).toEqual("890.00");
});