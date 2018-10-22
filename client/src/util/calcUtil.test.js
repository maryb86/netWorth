import {convert} from './calcUtil';

it('returns 0 when no params provided', () => {
  expect(convert()).toEqual(0);
});

it('uses default rates of 1 when no rates provided', () => {
  expect(convert(1.00)).toEqual(1);
});

it('uses default base rate of 1 when not provided', () => {
  expect(convert(1.00, {rate: 1.1})).toEqual(1.1);
});

it('uses default rate of 1 when not provided', () => {
  expect(convert(1.00, {baseRate: 1.1})).toEqual(1.1);
});

it('returns converted amount', () => {
  expect(convert(1.00, {baseRate: 1.1, rate: 1.2})).toEqual(1.32);
});