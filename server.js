
const express = require("express");
// const https = require("https");
const http = require("http");
const request = require('request');
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
// const apyController = require("./app/controllers/prices");
const apyController = require("./app/controllers/markets");
const dexController = require("./app/controllers/dexes");

var corsOptions = {
  origin: "*"
};

const app = express();
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/api/prices', apyController.getPrices);
app.get('/api/prices', apyController.getHistoricalMarketData);
app.get('/api/dexes', dexController.getHistoricalDexData);

setInterval(() => {
  apyController.calculateAndSave();
}, 30000);

setInterval(() => {
  dexController.scrapeAndSave();
}, 600000);

// const server = https.createServer(
//   {
//     key: fs.readFileSync("key.pem"),
//     cert: fs.readFileSync("cert.pem"),
//   },
//   app
// );

const server = http.createServer(
  app
);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
