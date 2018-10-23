function _getFetchObj(accounts, rates) {
    return {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accounts: accounts || {},
            rates: rates || {}
        })
    }
}

function _getTotal(endPoint, accounts, rates) {
    if (!endPoint || !accounts || !rates) {
        return Promise.reject("One of endPoint, accounts or rates is missing");
    }
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/calc/${endPoint}`, _getFetchObj(accounts, rates))
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
            reject(`Failed to calculate ${endPoint}. Error: ${error}`);
        });
    });
}

export function calcTotalForType(accounts, rates) {
    return _getTotal("totalForType", accounts, rates);
}


export function calcNetWorthTotal(accounts, rates) {
    return _getTotal("totalNetWorth", accounts, rates);
}


export default (
    calcTotalForType,
    calcNetWorthTotal
)