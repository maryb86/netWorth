const express = require('express'); //MARYTODO: CONFIGURE BABEL SO CAN USE IMPORT
const cors = require('cors');
const bodyParser = require('body-parser');
const NetWorthData = require('./NetWorthData');

const app = express();
const port = process.env.PORT || 5000;

const NetWorth = new NetWorthData();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());

/* endpoints:
*  /setCurrency -> returns all accountData converted to currency
*  /setAmount -> sets amount in NetWorthData obj memory, returns new total for assets,liabilities,networth
*  /getData -> returns NetWorth.getAccountData();
*/

app.post('/calc/setCurrency', (req, res) => {
  NetWorth.setCurrency(req.body.currency).then((response) => {
    res.json(response);
  });
});

app.post('/calc/setAmount', (req, res) => {
  NetWorth.setAmount(req.body).then((response) => {
    res.json(response);
  });
});

app.get('/calc/getData', (req, res) => {
  res.json(NetWorth.getAccountData());
});

app.listen(port, () => console.log(`Listening on port ${port}`));
