import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  endsWith,
  isArray,
} from 'easy-soft-utility';

import { emptyLogic, getCurrentLocation } from 'antd-management-fast-common';
import { PageExtra } from 'antd-management-fast-component';

import { InternalFlow } from '../InternalFlow';

const { TabBarExtraBox } = PageExtra;

const primaryCallName = 'Common::InternalSwitchoverFlow';

/**
 * 构建可切换相关。
 * @namespace Common
 * @class InternalSwitchoverFlow
 * @extends InternalFlow
 */
class InternalSwitchoverFlow extends InternalFlow {
  /**
   * path 路径前缀。
   * @member {string}
   */
  pathPrefix = '';

  /**
   * Tab 页集合。
   * @member {Array}
   */
  tabList = [];

  /**
   * Menu 页集合。
   * @member {Array}
   */
  menuList = [];

  /**
   * 构造函数
   * @param {Object} properties
   */
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  /**
   * 调整可用 Menu 页集合，默认为空逻辑，可根据需要重载。
   * @function
   * @param {Array} menuList 将要调整的 Menu 页集合
   * @returns {Array} 经过调整的可用 Menu 页集合
   * @example
   * adjustMenuListAvailable = (menuListAvailable) => menuListAvailable
   */
  adjustMenuListAvailable = (menuList) => {
    this.logCallTrack({}, primaryCallName, 'getMenuListAvailable', emptyLogic);

    return menuList;
  };

  /**
   * 获取可用 Menu 页集合。
   * @function
   * @returns {Array} 可用 Menu 页集合
   */
  getMenuListAvailable = () => {
    this.logCallTrack({}, primaryCallName, 'getMenuListAvailable');

    this.logCallTrace(
      {},
      primaryCallName,
      'getMenuListAvailable',
      'trigger',
      'adjustMenuListAvailable',
    );

    let menuListAdjust = [];

    if (isArray(this.menuList)) {
      menuListAdjust = this.adjustMenuListAvailable(this.menuList);
    }

    const menuListAvailable = [];

    for (const o of menuListAdjust || []) {
      const { hidden } = {
        hidden: false,
        ...o,
      };

      if (!hidden) {
        menuListAvailable.push(o);
      }
    }

    return menuListAvailable;
  };

  /**
   * Menu页切换回调处理。
   * @function
   * @param {Object} option 配置项。
   * @param {string} option.key 显示页的 key。
   */
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

  /**
   * 构建 Tab Bar Extra Content 左侧区域配置，默认为空，可根据需要重载。
   * @function
   * @example
   * establishTabBarExtraContentLeftConfig = () => null
   */
  establishTabBarExtraContentLeftConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishTabBarExtraContentRightConfig',
      emptyLogic,
    );

    return null;
  };

  /**
   * 构建 Tab Bar Extra Content 右侧区域配置，默认为空，可根据需要重载。
   * @function
   * @example
   * establishTabBarExtraContentRightConfig = () => null
   */
  establishTabBarExtraContentRightConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishTabBarExtraContentRightConfig',
      emptyLogic,
    );

    return null;
  };

  /**
   * 调整可用 Tab 页集合，默认为空逻辑，可根据需要重载。
   * @function
   * @param {Array} menuList 将要调整的 Tab 页集合
   * @returns {Array} 经过调整的可用 Tab 页集合
   * @example
   * adjustTabListAvailable = (tabList) => tabList
   */
  adjustTabListAvailable = (tabList) => tabList;

  /**
   * 获取可用 Tab 页集合。
   * @function
   * @returns {Array} 可用 Tab 页集合
   */
  getTabListAvailable = () => {
    this.logCallTrack({}, primaryCallName, 'getTabListAvailable');

    this.logCallTrace(
      {},
      primaryCallName,
      'getTabListAvailable',
      'trigger',
      'adjustTabListAvailable',
    );

    let tabListAdjust = [];

    if (isArray(this.tabList)) {
      tabListAdjust = this.adjustTabListAvailable(this.tabList);
    }

    const tabListAvailable = [];

    for (const o of tabListAdjust || []) {
      const { hidden } = {
        hidden: false,
        ...o,
      };

      if (!hidden) {
        tabListAvailable.push(o);
      }
    }

    return tabListAvailable;
  };

  /**
   * Tab 页切换回调处理。
   * @function
   * @param {Object} option 配置项。
   * @param {string} option.key 显示页的 key。
   */
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

  /**
   * 创建 Tab Bar Extra Content 部分。
   * @function
   */
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

  /**
   * 配置额外的 Tab 属性。
   * @function
   */
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
