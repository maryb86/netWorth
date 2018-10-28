function _getFetchObj(data) {
    return {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

//marytodo: lots of duplication here

export function getData() {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/calc/getData`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
            reject(`Failed to fetch from calc/getData. Error: ${error}`);
        });
    });
}

export function setCurrency(currency) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/calc/setCurrency`, _getFetchObj({currency: currency}))
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
            reject(`Failed to fetch from calc/setCurrency. Error: ${error}`);
        });
    });
}

export function setAmount(accountData) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/calc/setAmount`, _getFetchObj(accountData))
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
            reject(`Failed to fetch from calc/setAmount. Error: ${error}`);
        });
    });
}

export default (
    getData
)