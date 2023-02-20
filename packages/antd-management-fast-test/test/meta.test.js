// eslint-disable-next-line unicorn/prefer-module
const { trim } = require('antd-management-fast-common');

test('1', () => {
  expect(trim(' 1 ')).toBe('1');
});
