const convertDateToUnix = date => Math.floor(new Date(date).getTime() / 1000)

const makeMonth = (numOfMonth, daysInMonth, year = '2019') => {
  let month = [];
  for (let x = 0; x < daysInMonth; x += 1) {
    let date = `${year}.${numOfMonth}.${x + 1}`
    let day = convertDateToUnix(date);
    month.push(day);
  }
  return month;
}

module.exports = {
  convertDateToUnix,
  makeMonth
}
