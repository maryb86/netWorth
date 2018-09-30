import {calcTotalForType, calcNetWorthTotal} from './calcUtil';

const accounts = {
    assets: {
      cash: [{amount: "100.00"},{amount: "200.00"}],
      assets: [{amount: "300.00"},{amount: "400.00"}]
    },
    liabilities: {
      shortTerm: [{amount: "50.00"},{amount: "60.00"}],
    }
};

it('returns total of all accounts when one set provided', () => {
  expect(calcTotalForType({cash: accounts.assets.cash})).toEqual("300.00");
});

it('returns total of all accounts when multiple sets provided', () => {
  expect(calcTotalForType(accounts.assets)).toEqual("1000.00");
});

it('returns total of 0.00 when no accounts provided', () => {
  expect(calcTotalForType()).toEqual("0.00");
});

it('ignores accounts without amounts', () => {
  expect(calcTotalForType({cash: [{}]})).toEqual("0.00");
  expect(calcTotalForType({cash: [{amount: "100.00"},{}]})).toEqual("100.00");
});

it('returns total for all account types provided', () => {
  expect(calcNetWorthTotal(accounts)).toEqual("890.00");
});