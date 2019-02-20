const daysEachMonth = [
  31,
  // Feb changes to 29 in leap year
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];

const convertDateToUnix = date => Math.floor(new Date(date).getTime() / 1000);

const makeMonth = (numOfMonth, year = '2019') => {
  let month = [];
  let daysInMonth = daysEachMonth[parseInt(numOfMonth, 10) - 1];
  for (let x = 0; x < daysInMonth; x += 1) {
    let date = `${year}.${numOfMonth}.${x + 1}`;
    let day = convertDateToUnix(date);
    month.push(day);
  }

  return month;
};

module.exports = {
  convertDateToUnix,
  makeMonth
};
