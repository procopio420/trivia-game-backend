const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./db');

app.use(cors());
app.use(express.json());

app.get('/', db.getRanking);

app.post('/', db.setRanking);

app.listen(process.env.PORT || 3333, function () {
  console.log('Server started');
});
