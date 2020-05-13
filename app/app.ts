// lib/app.ts
let express = require('express');

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello test!');
});

app.listen(3000, function () {
  console.log('Whats up');
});
