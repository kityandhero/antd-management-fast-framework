import { Button, Dropdown, Menu, Tooltip } from 'antd';
import { PureComponent } from 'react';

import {
  iconCollection,
  listViewConfig,
} from 'antd-management-fast-common/es/utils/constants';

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

    const menu = (
      <Menu
        items={items}
        selectedKeys={[tableSize]}
        onClick={({ key }) => {
          if (setTableSize) {
            setTableSize(key);
          }
        }}
        style={{
          width: 80,
        }}
      />
    );

    return (
      <Dropdown overlay={menu}>
        <Tooltip title="表格密度">
          <Button
            shape="circle"
            style={{
              border: 0,
              color: '#000000',
            }}
            icon={iconCollection.columnHeight}
          />
        </Tooltip>
      </Dropdown>
    );
  }
}

export default DensityAction;
