import React from 'react';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { emptyLogic, getCurrentLocation } from 'antd-management-fast-common';
import { PageExtra } from 'antd-management-fast-component';

import { InternalFlow } from '../InternalFlow';

const { TabBarExtraBox } = PageExtra;

const primaryCallName = 'Common::InternalSwitchoverFlow';

class InternalSwitchoverFlow extends InternalFlow {
  tabList = [];

  menuList = [];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  adjustMenuListAvailable = (menuListAvailable) => {
    this.logCallTrack({}, primaryCallName, 'getMenuListAvailable', emptyLogic);

    return menuListAvailable;
  };

  getMenuListAvailable = () => {
    this.logCallTrack({}, primaryCallName, 'getMenuListAvailable');

    const menuListAvailable = [];

    for (const o of this.menuList || []) {
      const v = o.show === undefined ? true : o.show === true;

      if (v) {
        menuListAvailable.push(o);
      }
    }

    return this.adjustMenuListAvailable(menuListAvailable);
  };

  handleMenuChange = ({ key }) => {
    this.logCallTrack(
      {
        parameter: { key },
      },
      primaryCallName,
      'handleMenuChange',
    );

    const menuActiveKey = this.getMenuActiveKey();

    const { pathname } = getCurrentLocation();

    for (const item of this.menuList || []) {
      if (item.key === key) {
        let path = pathname.replace('/update/', '/load/');

        if (!checkStringIsNullOrWhiteSpace(menuActiveKey)) {
          path = path.replace(`/${menuActiveKey}`, '/');
        }

        path = `${path}${item.key}`;

        this.setMenuActiveKey(key);

        this.redirectToPath(path);

        break;
      }
    }
  };

  establishTabBarExtraContentLeftConfig = () => {
    return null;
  };

  establishTabBarExtraContentRightConfig = () => {
    return null;
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getTabListAvailable = () => {
    this.logCallTrack({}, primaryCallName, 'getTabListAvailable');

    const tabListAvailable = [];

    for (const o of this.tabList || []) {
      const v = o.show === undefined ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    }

    return this.adjustTabListAvailable(tabListAvailable);
  };

  handleTabChange = (key) => {
    this.logCallTrack(
      {
        parameter: { key },
      },
      primaryCallName,
      'handleTabChange',
    );

    const tabActiveKey = this.getTabActiveKey();

    const { pathname } = getCurrentLocation();

    for (const item of this.tabList || []) {
      if (item.key === key) {
        let path = pathname.replace('/update/', '/load/');

        if (!checkStringIsNullOrWhiteSpace(tabActiveKey)) {
          path = path.replace(`/${tabActiveKey}`, '/');
        }

        path = `${path}${item.key}`;

        this.setTabActiveKey(key);

        this.redirectToPath(path);

        break;
      }
    }
  };

  buildTabBarExtraContent = () => {
    return {
      left: (
        <TabBarExtraBox
          list={this.buildByExtraBuildType({
            keyPrefix: 'data_tab_container_tab_bar_left_action_key',
            configList: this.establishTabBarExtraContentLeftConfig(),
          })}
        />
      ),
      right: (
        <TabBarExtraBox
          list={this.buildByExtraBuildType({
            keyPrefix: 'data_tab_container_tab_bar_right_action_key',
            configList: this.establishTabBarExtraContentRightConfig(),
          })}
        />
      ),
    };
  };

  buildOtherTabProps = () => {
    const tabListAvailable = this.getTabListAvailable();

    if (tabListAvailable.length > 0) {
      return {
        type: 'card',
        size: 'small',
        tabBarStyle: {
          marginBottom: 0,
        },
        tabBarGutter: 3,
      };
    }

    return null;
  };
}

export { InternalSwitchoverFlow };
