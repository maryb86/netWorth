exports.calcTotalForType = function(accounts) {
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

  return total;
}

exports.calcNetWorthTotal = function(accounts) {
  const assets = accounts && accounts.assets ? this.calcTotalForType(accounts.assets) : 0.00;
  const liabilities = accounts && accounts.liabilities ? this.calcTotalForType(accounts.liabilities) : 0.00;
  return (assets - liabilities);
}

exports.convert = function(amount = 0, rates) {
  // convert to euro first...
  const baseAmount = amount * ((rates && rates.baseRate) || 1);
  // then to the new rate
  return baseAmount * ((rates && rates.rate) || 1);
};
