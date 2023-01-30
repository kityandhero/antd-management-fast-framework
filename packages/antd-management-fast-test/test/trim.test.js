import { trim } from 'antd-management-fast-common/es/utils/tools';

// const { trim } = require('antd-management-fast-common/es/utils/tools');

test('1', () => {
  expect(trim(' 1 ')).toBe('1');
});
