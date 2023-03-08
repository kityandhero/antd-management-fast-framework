import { getDispatch } from 'antd-management-fast-common';

export function changeTestValue() {
  const dispatch = getDispatch();

  dispatch({ type: 'testModel/changeValue', alias: 'data1' });
}
