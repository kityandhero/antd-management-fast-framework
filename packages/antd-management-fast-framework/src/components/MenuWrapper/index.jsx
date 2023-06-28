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
    this.checkActiveKey();
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

    console.log('===============');
    console.log(usableKey);

    if (!checkStringIsNullOrWhiteSpace(usableKey)) {
      menuControlAssist
        .getActiveKey(menuFlag)
        .then((activeKey) => {
          if (checkStringIsNullOrWhiteSpace(activeKey)) {
            menuControlAssist.setActiveKey(menuFlag, usableKey);
          }

          return activeKey;
        })
        .catch(() => {
          // ignore
        });
    }
  };

  renderFurther() {
    const { menuControl, menuFlag, mode, items, handleClick } = this.props;

    const activeKey = menuControl[menuFlag] || '';

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
