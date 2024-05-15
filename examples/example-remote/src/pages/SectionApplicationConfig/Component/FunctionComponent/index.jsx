import { Table } from 'antd';
import React from 'react';

import { getValueByKey, isArray, isFunction } from 'easy-soft-utility';

import { buildColumnList } from 'antd-management-fast-component';

import { configItemData } from '../../Common/data';

export function buildTable({ target, list, props: properties = {} }) {
  const listData = [];

  if (isArray(list || [])) {
    for (const o of list || []) {
      const v = {
        ...o,

        key: getValueByKey({
          data: o,
          key: configItemData.id.name,
        }),
        other: '--',
      };

      listData.push(v);
    }
  }

  const columns = buildColumnList({
    columnList: [
      {
        dataTarget: configItemData.name,

        align: 'left',
        showRichFacade: true,
        emptyValue: '--',
      },
      {
        dataTarget: configItemData.value,
        width: 240,
        showRichFacade: true,
        emptyValue: '--',
      },
      {
        dataTarget: configItemData.customOperate,
        width: 123,
        render: (value, record, index) => {
          const { buildOperate } = properties;

          if (isFunction(buildOperate)) {
            return buildOperate({
              target,
              value: value,
              record: record,
              index: index,
            });
          }

          return '--';
        },
      },
    ],
    attachedTargetName: target.constructor.name,
  });

  return (
    <Table
      columns={columns}
      dataSource={listData}
      pagination={{
        hideOnSinglePage: true,
      }}
      {...(properties || {})}
    />
  );
}
