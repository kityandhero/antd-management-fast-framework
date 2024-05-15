import { Input, Space } from 'antd';
import React from 'react';

import { layoutCollection } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

export function buildActionItems() {
  return [
    ({ layout: layoutValue }) => {
      if (layoutValue === layoutCollection.side) {
        return iconBuilder.search({
          style: {
            color: '#868686',
          },
        });
      }
      return (
        <Input
          style={{
            borderRadius: 4,
            marginInlineEnd: 12,
            backgroundColor: 'rgba(0,0,0,0.03)',
          }}
          prefix={iconBuilder.search({
            style: {
              color: '#868686',
            },
          })}
          placeholder="搜索方案"
          variant="borderless"
        />
      );
    },
    iconBuilder.infoCircle(
      {
        style: {
          color: '#868686',
        },
      },
      true,
    ),
  ];
}

export function buildSiderMenuExtra() {
  return (
    <div
      style={{
        paddingTop: '5px',
      }}
    >
      <Space align="center">
        <Input
          style={{
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,0.03)',
          }}
          prefix={iconBuilder.search({
            style: {
              color: 'rgba(0, 0, 0, 0.15)',
            },
          })}
          placeholder="搜索方案"
          variant="borderless"
        />

        {iconBuilder.search({
          style: {
            color: 'var(--ant-primary-color)',
            fontSize: 18,
          },
        })}
      </Space>
    </div>
  );
}

export function buildSiderMenuFooter() {
  return (
    <div
      style={{
        textAlign: 'center',
        paddingBlockStart: 12,
      }}
    >
      <div>Menu Footer</div>
    </div>
  );
}
