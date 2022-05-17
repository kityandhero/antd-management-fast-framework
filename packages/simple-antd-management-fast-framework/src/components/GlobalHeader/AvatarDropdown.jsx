import React from 'react';
import { connect, history } from 'umi';
import { Avatar, Menu, Spin } from 'antd';
import { ShopOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

import { recordDebug } from 'antd-management-fast-framework/es/utils/tools';
import { defaultUserAvatar } from 'antd-management-fast-framework/es/utils/constants';
import { checkHasAuthority } from 'antd-management-fast-framework/es/utils/authority';

import { accessWayCollection } from '@/customConfig/config';

import HeaderDropdown from '../HeaderDropdown';

import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'signOut') {
      const { dispatch } = this.props;

      if (dispatch) {
        const signOutType = 'entrance/signOut';

        recordDebug(`modal access: ${signOutType}`);

        dispatch({
          type: signOutType,
        });
      }

      return;
    }

    history.push(`/entrance/${key}`);
  };

  render() {
    const {
      currentOperator: { currentOperator = null },
    } = this.props;

    const menuItems = [];

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menuItems.map((o) => (
          <Menu.Item key={o.key}>
            {o.icon}
            {o.text}
          </Menu.Item>
        ))}

        {menuItems.length > 0 ? <Menu.Divider /> : null}

        <Menu.Item key="signOut">
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
          <span className={styles.name}>{currentOperator.loginName || '未知用户'}</span>
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
