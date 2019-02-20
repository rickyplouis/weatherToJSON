const https = require('https');
const constant = require('./constant');

// Uses ohare airportCoords
const airportCoords = ['41.9242', '-87.9073'];

const { apiKey } = constant;

const makeURL = unixTime =>
  `https://api.darksky.net/forecast/${apiKey}/${airportCoords[0]},${
    airportCoords[1]
  },${unixTime}?exclude=currently,flags,alerts,minutely,hourly`;

const makeAPICall = url =>
  new Promise((resolve, reject) => {
    https
      .get(url, resp => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(data);
        });
      })
      .on('error', err => {
        reject(err.message);
      });
  });

module.exports = {
  makeURL,
  makeAPICall
};
