import {convert} from './calcUtil';
const calcUtil = require('../../../util/calcUtil');
const accounts = {
  assets: {
    shortTerm: [{amount: "100.00"},{amount: "200.00"}],
    longTerm: [{amount: "300.00"},{amount: "400.00"}]
  },
  liabilities: {
    shortTerm: [{amount: "50.00"},{amount: "60.00"}],
  }
};


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

it('returns total of all accounts when one set provided', () => {
expect(calcUtil.calcTotalForType({shortTerm: accounts.assets.shortTerm})).toEqual("300.00");
});

it('returns total of all accounts when multiple sets provided', () => {
expect(calcUtil.calcTotalForType(accounts.assets)).toEqual("1000.00");
});

it('returns total of 0.00 when no accounts provided', () => {
expect(calcUtil.calcTotalForType()).toEqual("0.00");
});

it('ignores accounts without amounts', () => {
expect(calcUtil.calcTotalForType({shortTerm: [{}]})).toEqual("0.00");
expect(calcUtil.calcTotalForType({shortTerm: [{amount: "100.00"},{}]})).toEqual("100.00");
});

it('throws error if amount is negative', () => {
expect(() => {
  calcUtil.calcTotalForType({shortTerm: [{amount: "-100.00"}]});
}).toThrow();
});

it('calcs total net worth when assets and liabilities provided', () => {
expect(calcUtil.calcNetWorthTotal(accounts)).toEqual("890.00");
});

it('calcs total net worth when liabilities not provided or 0.00', () => {
expect(calcUtil.calcNetWorthTotal({assets: accounts.assets})).toEqual("1000.00");
expect(calcUtil.calcNetWorthTotal({assets: accounts.assets, liabilities: {shortTerm: [{amount: "0.00"}]}})).toEqual("1000.00");
});

it('calcs total net worth when assets not provided or 0.00', () => {
expect(calcUtil.calcNetWorthTotal({liabilities: accounts.liabilities})).toEqual("-110.00");
expect(calcUtil.calcNetWorthTotal({liabilities: accounts.liabilities, assets: {shortTerm: [{amount: "0.00"}]}})).toEqual("-110.00");
});

it('converts if exchange rate provided', () => {
expect(calcUtil.calcNetWorthTotal(accounts, {rate: 1.1})).toEqual("979.00");
});

it('returns amount if exchange rate not provided', () => {
expect(calcUtil.calcNetWorthTotal(accounts)).toEqual("890.00");
});

it('converts to euro before final conversion', () => {
expect(calcUtil.calcNetWorthTotal(accounts, {baseRate: 1.1, rate: 1.2})).toEqual("1174.80");
});