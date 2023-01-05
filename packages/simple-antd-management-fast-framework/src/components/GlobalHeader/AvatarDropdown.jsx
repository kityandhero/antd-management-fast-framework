import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { connect } from 'umi';

import { defaultUserAvatar } from 'antd-management-fast-common/es/utils/constants';
import {
  goToPath,
  recordDebug,
} from 'antd-management-fast-common/es/utils/tools';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';

import HeaderDropdown from '../HeaderDropdown';

import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'signOut') {
      const { dispatch } = this.props;

      if (dispatch) {
        const signOutType = 'entrance/signOut';

        recordDebug(`model access: ${signOutType}`);

        dispatch({
          type: signOutType,
        });
      }

      return;
    }

    goToPath(`/entrance/${key}`);
  };

  render() {
    const {
      currentOperator: { currentOperator = null },
    } = this.props;

    const items = [
      {
        key: 'signOut',
        label: '退出登录',
        icon: iconBuilder.logout(),
      },
    ];

    const menuHeaderDropdown = (
      <Menu
        items={items}
        className={styles.menu}
        selectedKeys={[]}
        onClick={this.onMenuClick}
      />
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
