import { Table } from 'antd';
import React from 'react';

import {
  buildRandomHexColor,
  getValueByKey,
  isArray,
  isFunction,
  toString,
} from 'easy-soft-utility';

import { columnFacadeMode } from 'antd-management-fast-common';
import { buildColumnList } from 'antd-management-fast-component';

import {
  getApplicationNavigationAccessibilityName,
  getApplicationNavigationOperationTypeName,
  getApplicationNavigationVisibilityName,
} from '../../../../customSpecialComponents';
import { navigationItemData } from '../../Common/data';

export function buildTable({ target, list, props: properties = {} }) {
  const listData = [];

  if (isArray(list || [])) {
    for (const o of list || []) {
      const v = {
        ...o,

        key: getValueByKey({
          data: o,
          key: navigationItemData.id.name,
        }),
        other: '--',
      };

      listData.push(v);
    }
  }

  const columns = buildColumnList({
    columnList: [
      {
        dataTarget: navigationItemData.title,
        width: 140,
        align: 'left',
        showRichFacade: true,
        emptyValue: '--',
      },
      {
        dataTarget: navigationItemData.icon,
        width: 60,
        showRichFacade: true,
        facadeMode: columnFacadeMode.image,
      },
      {
        dataTarget: navigationItemData.path,
        align: 'left',
        showRichFacade: true,
        emptyValue: '--',
      },
      {
        dataTarget: navigationItemData.exteriorMicroAppId,
        width: 200,
        showRichFacade: true,
        emptyValue: '--',
      },
      {
        dataTarget: navigationItemData.operationType,
        width: 160,
        showRichFacade: true,
        emptyValue: '--',
        facadeConfigBuilder: (value) => {
          return {
            color: buildRandomHexColor({
              seed: value + 21,
            }),
          };
        },
        formatValue: (value) => {
          return getApplicationNavigationOperationTypeName({
            value: value,
          });
        },
      },
      {
        dataTarget: navigationItemData.visibility,
        width: 100,
        showRichFacade: true,
        emptyValue: '--',
        facadeConfigBuilder: (value) => {
          return {
            color: buildRandomHexColor({
              seed: value + 41,
            }),
          };
        },
        formatValue: (value) => {
          return getApplicationNavigationVisibilityName({
            value: value,
          });
        },
      },
      {
        dataTarget: navigationItemData.accessibility,
        width: 100,
        showRichFacade: true,
        emptyValue: '--',
        facadeConfigBuilder: (value) => {
          return {
            color: buildRandomHexColor({
              seed: value + 72,
            }),
          };
        },
        formatValue: (value) => {
          return getApplicationNavigationAccessibilityName({
            value: value,
          });
        },
      },
      {
        dataTarget: navigationItemData.sort,
        width: 80,
        showRichFacade: true,
        emptyValue: '--',
        formatValue: (value) => {
          return toString(value);
        },
      },
      {
        dataTarget: navigationItemData.customOperate,
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

export function buildSortTable({ target, list, props: properties = {} }) {
  const listData = [];

  if (isArray(list || [])) {
    for (const o of list || []) {
      const v = {
        ...o,

        key: getValueByKey({
          data: o,
          key: navigationItemData.id.name,
        }),
        other: '--',
      };

      listData.push(v);
    }
  }

  const columns = buildColumnList({
    columnList: [
      {
        dataTarget: navigationItemData.title,
        width: 140,
        align: 'left',
        showRichFacade: true,
        emptyValue: '--',
      },
      {
        dataTarget: navigationItemData.icon,
        width: 60,
        showRichFacade: true,
        facadeMode: columnFacadeMode.image,
      },
      {
        dataTarget: navigationItemData.path,
        align: 'left',
        showRichFacade: true,
        emptyValue: '--',
      },
      {
        dataTarget: navigationItemData.sort,
        width: 80,
        showRichFacade: true,
        emptyValue: '--',
        formatValue: (value) => {
          return toString(value);
        },
      },
      {
        dataTarget: navigationItemData.customOperate,
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
