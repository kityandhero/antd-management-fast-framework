import { trim } from 'antd-management-fast-common';

// const { trim } = require('antd-management-fast-common');

test('1', () => {
  expect(trim(' 1 ')).toBe('1');
});
