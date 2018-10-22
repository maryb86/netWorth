const express = require('express'); //MARYTODO: CONFIGURE BABEL SO CAN USE IMPORT
const cors = require('cors');
const bodyParser = require('body-parser');
const calcUtil = require('./util/calcUtil');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());

app.post('/calc/totalForType', (req, res) => {
  const total = calcUtil.calcTotalForType(req.body.accounts, req.body.rates);
  res.json({total: total});
});

app.post('/calc/totalNetWorth', (req, res) => {
  const total = calcUtil.calcNetWorthTotal(req.body.accounts, req.body.rates);
  res.json({total: total});
});

app.listen(port, () => console.log(`Listening on port ${port}`));

