export function calcTotalForType(accounts) {
  const amounts = [0.00];
  let total = amounts[0];
  if (accounts) {
    Object.keys(accounts).forEach(account => {
        accounts[account].map((account) => {
          let amount = 0.00;
          if (account.amount) {
            amount = parseFloat(account.amount);
            if (amount < 0.00) {
              throw new Error(`Amount ${account.amount} is not positive. All amounts, including liabilities, should be positive.`)
            }
          }
          return amounts.push(amount);
        });
    });

    if (amounts.length > 1){
      total = amounts.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
  }

  return total.toFixed(2);
}

export function calcNetWorthTotal(accounts) {
  const assets = accounts && accounts.assets ? calcTotalForType(accounts.assets) : 0.00;
  const liabilities = accounts && accounts.liabilities ? calcTotalForType(accounts.liabilities) : 0.00;

  return (assets - liabilities).toFixed(2);
}

export default (
  calcTotalForType,
  calcNetWorthTotal
)