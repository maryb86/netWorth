export default function getTotalByType(accounts) {
    const amounts = [0.00];
    let total = amounts[0];
    if (accounts) {
      Object.keys(accounts).forEach(account => {
        if (accounts[account]) {
          accounts[account].map((account) => {
            return account.amount ? amounts.push(parseFloat(account.amount)) : undefined;
          });
        }
      });

      if (amounts.length > 1){
        total = amounts.reduce((accumulator, currentValue) => accumulator + currentValue);
      }
    }

    return total.toFixed(2);
}