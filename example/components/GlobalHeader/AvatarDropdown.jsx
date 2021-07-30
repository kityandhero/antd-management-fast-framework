import React from 'react';
import { connect, history } from 'umi';
import { Avatar, Menu, Spin } from 'antd';
import {
  ShopOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { checkHasAuthority } from '../../../lib/utils/authority';
import { defaultUserAvatar } from '../../../lib/utils/constants';
import { accessWayCollection } from '@/customConfig/config';

import HeaderDropdown from '../HeaderDropdown';

import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'areaConfig') {
      history.push('/system/areaConfig');
      return;
    }

    if (key === 'warehouse') {
      history.push('/system/areaConfig/editMasterWarehouse');
      return;
    }

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    history.push(`/account/${key}`);
  };

  render() {
    const {
      global: { currentOperator = null },
    } = this.props;

    const menuItems = [];

    if (checkHasAuthority(accessWayCollection.areaConfig.get)) {
      menuItems.push({
        key: 'areaConfig',
        icon: <SettingOutlined />,
        text: '地区设置',
      });
    }

    if (checkHasAuthority(accessWayCollection.warehouse.getMaster)) {
      menuItems.push({
        key: 'warehouse',
        icon: <ShopOutlined />,
        text: '主仓信息',
      });
    }

    const menuHeaderDropdown = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={this.onMenuClick}
      >
        {menuItems.map((o) => (
          <Menu.Item key={o.key}>
            {o.icon}
            {o.text}
          </Menu.Item>
        ))}

        {menuItems.length > 0 ? <Menu.Divider /> : null}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return currentOperator != null ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar
            size="small"
            className={styles.avatar}
            src={currentOperator.avatar || defaultUserAvatar}
            alt="avatar"
          />
          <span className={styles.name}>
            {currentOperator.loginName || '未知用户'}
          </span>
        </span>
      </HeaderDropdown>
    ) : (
      <div className="unknownBox">
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </div>
    );
  }
}

export default connect(({ global }) => ({
  global,
}))(AvatarDropdown);
