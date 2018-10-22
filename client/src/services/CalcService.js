function _getFetchObj(accounts, rates) {
    return {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accounts: accounts,
            rates: rates
        })
    }
}

export function calcTotalForType(accounts, rates) { //MARYTODO: ERROR HANDLING
    return new Promise((resolve) => {
        fetch("http://localhost:5000/calc/totalForType", _getFetchObj(accounts, rates))
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          resolve(response);
        });
    });
}


export function calcNetWorthTotal(accounts, rates) { //MARYTODO: ERROR HANDLING
    return new Promise((resolve) => {
        fetch("http://localhost:5000/calc/totalNetWorth", _getFetchObj(accounts, rates))
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          resolve(response);
        });
    });
}


export default (
    calcTotalForType,
    calcNetWorthTotal
)