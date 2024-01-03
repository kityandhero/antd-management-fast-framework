import React from 'react';

import { checkStringIsNullOrWhiteSpace, endsWith } from 'easy-soft-utility';

import { emptyLogic, getCurrentLocation } from 'antd-management-fast-common';
import { PageExtra } from 'antd-management-fast-component';

import { InternalFlow } from '../InternalFlow';

const { TabBarExtraBox } = PageExtra;

const primaryCallName = 'Common::InternalSwitchoverFlow';

class InternalSwitchoverFlow extends InternalFlow {
  pathPrefix = '';

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

    this.logCallTrace(
      {},
      primaryCallName,
      'getMenuListAvailable',
      'trigger',
      'adjustMenuListAvailable',
    );

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

    this.logCallTrace(
      {},
      primaryCallName,
      'handleMenuChange',
      'trigger',
      'getCurrentLocation',
    );

    const { pathname } = getCurrentLocation();

    if (checkStringIsNullOrWhiteSpace(this.pathPrefix)) {
      this.logCallTrace(
        {},
        primaryCallName,
        'handleMenuChange',
        'trigger',
        'getMenuListAvailable',
      );

      const menuList = this.getMenuListAvailable();

      for (const o of menuList) {
        const { key } = o;

        if (endsWith(pathname, key)) {
          this.pathPrefix = pathname.replace(`/${key}`, '/');

          break;
        }
      }
    }

    for (const item of this.menuList || []) {
      if (item.key === key) {
        let path = this.pathPrefix.replace('/update/', '/load/');

        path = `${path}${item.key}`;

        this.logCallTrace(
          {},
          primaryCallName,
          'handleMenuChange',
          'trigger',
          'setMenuActiveKey',
        );

        this.setMenuActiveKey(key);

        this.logCallTrace(
          {},
          primaryCallName,
          'handleMenuChange',
          'trigger',
          'redirectToPath',
        );

        this.redirectToPath(path);

        break;
      }
    }
  };

  establishTabBarExtraContentLeftConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishTabBarExtraContentRightConfig',
      emptyLogic,
    );

    return null;
  };

  establishTabBarExtraContentRightConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishTabBarExtraContentRightConfig',
      emptyLogic,
    );

    return null;
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getTabListAvailable = () => {
    this.logCallTrack({}, primaryCallName, 'getTabListAvailable');

    const tabListAvailable = [];

    for (const o of this.tabList || []) {
      const { hidden } = {
        hidden: false,
        ...o,
      };

      if (!hidden) {
        tabListAvailable.push(o);
      }
    }

    this.logCallTrace(
      {},
      primaryCallName,
      'getTabListAvailable',
      'trigger',
      'adjustTabListAvailable',
    );

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

    const { pathname } = getCurrentLocation();

    if (checkStringIsNullOrWhiteSpace(this.pathPrefix)) {
      this.logCallTrace(
        {},
        primaryCallName,
        'handleTabChange',
        'trigger',
        'getTabListAvailable',
      );

      const tabList = this.getTabListAvailable();

      for (const o of tabList) {
        const { key } = o;

        if (endsWith(pathname, key)) {
          this.pathPrefix = pathname.replace(`/${key}`, '/');

          break;
        }
      }
    }

    for (const item of this.tabList || []) {
      if (item.key === key) {
        let path = this.pathPrefix.replace('/update/', '/load/');

        path = `${path}${item.key}`;

        this.logCallTrace(
          {},
          primaryCallName,
          'handleTabChange',
          'trigger',
          'setTabActiveKey',
        );

        this.setTabActiveKey(key);

        this.logCallTrace(
          {},
          primaryCallName,
          'handleTabChange',
          'trigger',
          'redirectToPath',
        );

        this.redirectToPath(path);

        break;
      }
    }
  };

  buildTabBarExtraContent = () => {
    this.logCallTrack({}, primaryCallName, 'buildTabBarExtraContent');

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
    this.logCallTrack({}, primaryCallName, 'buildOtherTabProps');

    this.logCallTrace(
      {},
      primaryCallName,
      'buildOtherTabProps',
      'trigger',
      'getTabListAvailable',
    );

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
