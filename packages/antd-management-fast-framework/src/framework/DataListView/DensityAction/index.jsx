import React, { PureComponent } from 'react';
import { ColumnHeightOutlined } from '@ant-design/icons';
import { Menu, Button, Dropdown, Tooltip } from 'antd';

import { tableSizeConfig } from '../../../customComponents/StandardTableCustom';

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
            <Menu.Item key={tableSizeConfig.small}>紧凑</Menu.Item>
            <Menu.Item key={tableSizeConfig.middle}>中等</Menu.Item>
            <Menu.Item key={tableSizeConfig.large}>宽松</Menu.Item>
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
