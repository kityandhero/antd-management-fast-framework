import { clone, toArr, uid } from '@formily/shared';

export const traverseTree = (
  data,
  // eslint-disable-next-line no-unused-vars
  callback = (dataItem, index, data) => {},
) => {
  for (let index = 0; index < data.length; index++) {
    callback(data[index], index, data);

    if (data[index]?.children) {
      traverseTree(data[index]?.children, callback);
    }
  }
};

export const transformValueToData = (value) => {
  const data = clone(value);

  traverseTree(data, (item, index, dataSource) => {
    const dataItem = {
      key: '',
      duplicateKey: '',
      map: [],
      children: [],
    };

    for (const [key, value] of Object.entries(dataSource[index] || {})) {
      if (key !== 'children') {
        dataItem.map.push({ label: key, value: value });
      }
    }

    const uuid = uid();

    dataItem.key = uuid;
    dataItem.duplicateKey = uuid;
    dataItem.children = dataSource[index].children || [];

    dataSource[index] = dataItem;
  });
  return data;
};

export const transformDataToValue = (data) => {
  const value = clone(data);

  traverseTree(value, (item, index, dataSource) => {
    const valueItem = {
      children: [],
    };

    for (const item of toArr(dataSource[index].map)) {
      if (item.label) {
        valueItem[item.label] = item.value;
      }
    }

    valueItem.children = dataSource[index]?.children || [];

    dataSource[index] = valueItem;
  });
  return value;
};
