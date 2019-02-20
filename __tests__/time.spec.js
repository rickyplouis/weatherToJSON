const time = require('../time');

const { convertDateToUnix } = time;

test('testing::convertDateToUnix', () => {
  expect(typeof convertDateToUnix()).toBe('number');
});
