const fs = require('fs');
const time = require('./time');
const helper = require('./helper');

const { makeURL, makeAPICall } = helper;
const { makeMonth } = time;

const writeJSON = json =>
  fs.writeFile('weather.json', JSON.stringify(json), err => {
    if (err) {
      console.log(err);
      return err;
    }
  });

// Let december = makeMonth('12', '2018');
// Let january = makeMonth('01');
let february = makeMonth('02');

const combineJSON = arrayOfJSON => {
  let json = {
    data: []
  };

  for (let obj of arrayOfJSON) {
    json.data.push(obj);
  }

  return json;
};

const main = () => {
  let jsonArray = [];
  // Use hardcoded data to achieve business objectives
  let dateRange = february; // December.concat(january, february);
  let promises = [];
  for (let date of dateRange) {
    promises.push(makeAPICall(makeURL(date)));
  }

  Promise.all(promises).then(data => {
    for (let res of data) {
      jsonArray.push(JSON.parse(res));
    }

    let giantJSON = combineJSON(jsonArray);
    writeJSON(giantJSON.data);
  });
};

main();
