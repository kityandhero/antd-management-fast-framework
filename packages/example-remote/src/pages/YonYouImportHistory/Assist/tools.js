import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  showSimpleInfoMessage,
  showSimpleWarnMessage,
} from 'easy-soft-utility';

import { fieldDataMapConfig, statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case statusCollection.normal: {
      result = 'processing';
      break;
    }

    case statusCollection.disable: {
      result = 'warning';
      break;
    }

    default: {
      result = 'default';
      break;
    }
  }

  return result;
}

export function buildColumn(columnCount) {
  const list = [
    {
      title: 'no',
      width: 80,
      dataIndex: 'no',
      key: 'no',
      align: 'center',
    },
  ];

  for (let index = 1; index <= columnCount; index++) {
    const name = `column${index}`;

    const o =
      columnCount === index
        ? {
            title: name,
            dataIndex: name,
            key: name,
            align: 'center',
          }
        : {
            title: name,
            // width: 300,
            dataIndex: name,
            key: name,
            align: 'center',
          };

    list.push(o);
  }

  return list;
}

export function buildImportListData(list, mapConfig) {
  let listData = [];

  for (const one of list) {
    const data = {};

    if (
      checkStringIsNullOrWhiteSpace(
        mapConfig[fieldDataMapConfig.organization.name],
      )
    ) {
      showSimpleWarnMessage(
        `请设置 ${fieldDataMapConfig.organization.label} 键值映射`,
      );

      return [];
    }

    if (
      checkStringIsNullOrWhiteSpace(
        mapConfig[fieldDataMapConfig.personnelCode.name],
      )
    ) {
      showSimpleWarnMessage(
        `请设置 ${fieldDataMapConfig.personnelCode.label} 键值映射`,
      );

      return [];
    }

    if (
      checkStringIsNullOrWhiteSpace(mapConfig[fieldDataMapConfig.gender.name])
    ) {
      showSimpleWarnMessage(
        `请设置 ${fieldDataMapConfig.gender.label} 键值映射`,
      );

      return [];
    }

    if (
      checkStringIsNullOrWhiteSpace(mapConfig[fieldDataMapConfig.name.name])
    ) {
      showSimpleWarnMessage(`请设置 ${fieldDataMapConfig.name.label} 键值映射`);

      return [];
    }

    if (
      checkStringIsNullOrWhiteSpace(mapConfig[fieldDataMapConfig.phone.name])
    ) {
      showSimpleWarnMessage(
        `请设置 ${fieldDataMapConfig.phone.label} 键值映射`,
      );

      return [];
    }

    data[fieldDataMapConfig.organization.name] =
      one[mapConfig[fieldDataMapConfig.organization.name]];

    data[fieldDataMapConfig.personnelCode.name] =
      one[mapConfig[fieldDataMapConfig.personnelCode.name]];

    data[fieldDataMapConfig.gender.name] =
      one[mapConfig[fieldDataMapConfig.gender.name]];

    data[fieldDataMapConfig.name.name] =
      one[mapConfig[fieldDataMapConfig.name.name]];

    data[fieldDataMapConfig.phone.name] =
      one[mapConfig[fieldDataMapConfig.phone.name]];

    listData.push(data);
  }

  if (!isArray(listData) || isEmptyArray(listData)) {
    showSimpleInfoMessage('无数据可以导入');

    return [];
  }

  return listData;
}
