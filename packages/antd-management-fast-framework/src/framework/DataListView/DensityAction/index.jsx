import { Button, Dropdown, Tooltip } from 'antd';
import React, { PureComponent } from 'react';

import { listViewConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

class DensityAction extends PureComponent {
  render() {
    const { tableSize, setTableSize } = this.props;

    const items = [
      {
        key: listViewConfig.tableSize.small,
        label: '紧凑',
      },
      {
        key: listViewConfig.tableSize.middle,
        label: '中等',
      },
      {
        key: listViewConfig.tableSize.large,
        label: '宽松',
      },
    ];

    return (
      <Dropdown
        menu={{
          items: items,
          selectedKeys: [tableSize],
          onClick: ({ key }) => {
            if (setTableSize) {
              setTableSize(key);
            }
          },
          style: {
            width: 80,
          },
        }}
      >
        <Tooltip title="表格密度">
          <Button
            shape="circle"
            style={{
              border: 0,
              color: '#000000',
            }}
            icon={iconBuilder.columnHeight()}
          />
        </Tooltip>
      </Dropdown>
    );
  }
}

export { DensityAction };
