const fs = require('fs');
const time = require('./time');
const helper = require('./helper');

const { makeURL, makeAPICall } = helper;
const { convertDateToUnix, makeMonth } = time;

const daysInDec = 31;
const daysInJan = 31;

const writeJSON = (json) => {
  console.log('writeJSON::json', json);
  fs.writeFile('weather.json', JSON.stringify(json), (err) => {
      if (err) {
          console.log(err);
      }
      console.log('wrote weather.json');
  });
}

let december = makeMonth('12', daysInDec, '2018');
let january = makeMonth('01', daysInJan);
let february = makeMonth('02', 03);

const combineJSON = (arrayOfJSON) => {
  let json = {
    data: [],
  }
  for (let obj of arrayOfJSON) {
    json.data.push(obj);
  }
  return json;
}

const main = () => {
  let jsonArray = [];
  // use hardcoded data to achieve business objectives
  let dateRange = february; //december.concat(january, february);
  let promises = [];
  for (let date of dateRange) {
    promises.push(makeAPICall(makeURL(date)))
  }
  Promise.all(promises).then((data) => {
    for (let res of data) {
      jsonArray.push(JSON.parse(res));
    }
    let giantJSON = combineJSON(jsonArray);
    writeJSON(giantJSON.data);
  })
}

main();
