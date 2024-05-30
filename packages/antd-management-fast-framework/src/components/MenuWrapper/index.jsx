import { Menu } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  endsWith,
  isArray,
  isEmptyArray,
} from 'easy-soft-utility';

import { getCurrentLocation } from 'antd-management-fast-common';
import { BaseComponent } from 'antd-management-fast-component';

import { menuControlAssist } from '../../utils/menuControlAssist';

@connect(({ menuControl }) => ({
  menuControl,
}))
class MenuWrapper extends BaseComponent {
  doWorkAfterDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.checkActiveKey();
    }, 300);
  };

  getUsableKey = () => {
    const { items } = this.props;

    const { pathname } = getCurrentLocation();

    let result = '';

    for (const item of items) {
      const { key } = item;

      if (endsWith(pathname, key)) {
        result = key;

        break;
      }
    }

    return result;
  };

  checkActiveKey = () => {
    const { menuFlag, items } = this.props;

    if (!isArray(items)) {
      return;
    }

    if (isEmptyArray(items)) {
      return;
    }

    const usableKey = this.getUsableKey();

    if (!checkStringIsNullOrWhiteSpace(usableKey)) {
      const activeKey = menuControlAssist.getActiveKey(menuFlag);

      if (checkStringIsNullOrWhiteSpace(activeKey)) {
        menuControlAssist.setActiveKey(menuFlag, usableKey);
      }

      return activeKey;
    }
  };

  getActiveKey = () => {
    const { menuControl, menuFlag } = this.props;

    const activeKey = menuControl[menuFlag] || '';

    return activeKey;
  };

  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    const { mode, items, handleClick } = this.props;

    const activeKey = this.getActiveKey();

    return (
      <Menu
        mode={mode}
        items={items}
        selectedKeys={[activeKey]}
        onClick={handleClick}
      />
    );
  }
}

export { MenuWrapper };
