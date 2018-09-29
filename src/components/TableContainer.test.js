import React from 'react';
import { shallow } from 'enzyme';
import TableContainer from './TableContainer';
import UpperTable from './tables/UpperTable';

it('renders TableContainer without crashing', () => {
  const TableContainerWrapper = shallow(<TableContainer />);
  expect(TableContainerWrapper.find(".table-container")).toHaveLength(1);
  expect(TableContainerWrapper.find(UpperTable)).toHaveLength(2);
});