const https = require('https');
const fs = require('fs');
const constant = require('./constant');

const { apiKey } = constant;

// Uses ohare airportCoords
const airportCoords = ['41.9242', '-87.9073']

const daysInDec = 31;
const daysInJan = 31;

const convertDateToUnix = date => Math.floor(new Date(date).getTime() / 1000)

const makeMonth = (numOfMonth, daysInMonth) => {
  let month = [];
  for (let x = 0; x < daysInMonth; x += 1) {
    let date = `2019.${numOfMonth}.${x + 1}`
    let day = convertDateToUnix(date);
    month.push(day);
  }
  return month;
}

const makeURL = unixTime => `https://api.darksky.net/forecast/${apiKey}/${airportCoords[0]},${airportCoords[1]},${unixTime}?exclude=currently,flags,alerts,minutely,hourly`;

const makeAPICall = (url) => {
  return new Promise((resolve, reject) =>  {
    https.get(url, (resp) => {
     let data = '';

     // A chunk of data has been recieved.
     resp.on('data', (chunk) => {
       data += chunk;
     });

     // The whole response has been received. Print out the result.
     resp.on('end', () => {
       resolve(data);
     });

   }).on("error", (err) => {
     reject(err.message)
   });
  });
}

const writeJSON = (json) => {
  fs.writeFile('weather.json', JSON.stringify(json), (err) => {
      if (err) {
          console.log(err);
      }
      console.log('wrote weather.json');
  });
}

let december = makeMonth('12', daysInDec);
let january = makeMonth('01', daysInJan);
let february = makeMonth('02', 2)

const combineJSON = (arrayOfJSON) => {
  return arrayOfJSON.reduce((acc, json) => {
    json = Object.assign({}, acc, json);
    return json;
  }, {})
}

const main = () => {
  let jsonArray = [];
  // use feb until confirmed program works to prevent rate limiting
  //let dateRange = december.concat(january, february);
  let dateRange = february;
  let promises = [];
  for (let date of dateRange) {
    promises.push(makeAPICall(makeURL(date)))
  }
  Promise.all(promises).then((data) => {
    for (let res of data) {
      console.log('res', res);
      jsonArray.push(JSON.parse(res));
    }
    let giantJSON = combineJSON(jsonArray);
    writeJSON(giantJSON);
  })
}

main();
