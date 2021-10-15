import React, { PureComponent } from 'react';
import { Menu, Button, Dropdown, Tooltip } from 'antd';
import { ColumnHeightOutlined } from '@ant-design/icons';

import { listViewConfig } from '../../../utils/constants';

class DensityAction extends PureComponent {
  render() {
    const { tableSize, setTableSize } = this.props;

    return (
      <Dropdown
        overlay={
          <Menu
            selectedKeys={[tableSize]}
            onClick={({ key }) => {
              if (setTableSize) {
                setTableSize(key);
              }
            }}
            style={{
              width: 80,
            }}
          >
            <Menu.Item key={listViewConfig.tableSize.small}>紧凑</Menu.Item>
            <Menu.Item key={listViewConfig.tableSize.middle}>中等</Menu.Item>
            <Menu.Item key={listViewConfig.tableSize.large}>宽松</Menu.Item>
          </Menu>
        }
      >
        <Tooltip title="表格密度">
          <Button
            shape="circle"
            style={{
              border: 0,
              color: '#000000',
            }}
            icon={<ColumnHeightOutlined />}
          />
        </Tooltip>
      </Dropdown>
    );
  }
}

export default DensityAction;
