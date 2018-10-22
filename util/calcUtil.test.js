import {calcTotalForType, calcNetWorthTotal} from './calcUtil';

const accounts = {
    assets: {
      shortTerm: [{amount: "100.00"},{amount: "200.00"}],
      longTerm: [{amount: "300.00"},{amount: "400.00"}]
    },
    liabilities: {
      shortTerm: [{amount: "50.00"},{amount: "60.00"}],
    }
};

it('returns total of all accounts when one set provided', () => {
  expect(calcTotalForType({shortTerm: accounts.assets.shortTerm})).toEqual("300.00");
});

it('returns total of all accounts when multiple sets provided', () => {
  expect(calcTotalForType(accounts.assets)).toEqual("1000.00");
});

it('returns total of 0.00 when no accounts provided', () => {
  expect(calcTotalForType()).toEqual("0.00");
});

it('ignores accounts without amounts', () => {
  expect(calcTotalForType({shortTerm: [{}]})).toEqual("0.00");
  expect(calcTotalForType({shortTerm: [{amount: "100.00"},{}]})).toEqual("100.00");
});

it('throws error if amount is negative', () => {
  expect(() => {
    calcTotalForType({shortTerm: [{amount: "-100.00"}]});
  }).toThrow();
});

it('calcs total net worth when assets and liabilities provided', () => {
  expect(calcNetWorthTotal(accounts)).toEqual("890.00");
});

it('calcs total net worth when liabilities not provided or 0.00', () => {
  expect(calcNetWorthTotal({assets: accounts.assets})).toEqual("1000.00");
  expect(calcNetWorthTotal({assets: accounts.assets, liabilities: {shortTerm: [{amount: "0.00"}]}})).toEqual("1000.00");
});

it('calcs total net worth when assets not provided or 0.00', () => {
  expect(calcNetWorthTotal({liabilities: accounts.liabilities})).toEqual("-110.00");
  expect(calcNetWorthTotal({liabilities: accounts.liabilities, assets: {shortTerm: [{amount: "0.00"}]}})).toEqual("-110.00");
});

it('converts if exchange rate provided', () => {
  expect(calcNetWorthTotal(accounts, {rate: 1.1})).toEqual("979.00");
});

it('returns amount if exchange rate not provided', () => {
  expect(calcNetWorthTotal(accounts)).toEqual("890.00");
});

it('converts to euro before final conversion', () => {
  expect(calcNetWorthTotal(accounts, {baseRate: 1.1, rate: 1.2})).toEqual("1174.80");
});