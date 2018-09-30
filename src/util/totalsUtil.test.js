import getTotalByType from './totalsUtil';

const accounts = {
    cash: [{amount: "100.00"},{amount: "200.00"}],
    assets: [{amount: "300.00"},{amount: "400.00"}]
};

it('returns total of all accounts when one set provided', () => {
  expect(getTotalByType({cash: accounts.cash})).toEqual("300.00");
});

it('returns total of all accounts when multiple sets provided', () => {
  expect(getTotalByType(accounts)).toEqual("1000.00");
});

it('returns total of 0.00 when no accounts provided', () => {
  expect(getTotalByType()).toEqual("0.00");
});

it('ignores accounts without amounts', () => {
  expect(getTotalByType({cash: [{}]})).toEqual("0.00");
  expect(getTotalByType({cash: [{amount: "100.00"},{}]})).toEqual("100.00");
});