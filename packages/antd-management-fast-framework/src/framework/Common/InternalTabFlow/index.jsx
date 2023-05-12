import React from 'react';

import {
  getCurrentLocation,
  getCurrentRoute,
} from 'antd-management-fast-common';
import { PageExtra } from 'antd-management-fast-component';

import { InternalFlow } from '../InternalFlow';

const { TabBarExtraBox } = PageExtra;

const primaryCallName = 'Common::InternalTabFlow';

class InternalTabFlow extends InternalFlow {
  tabList = [];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  doOtherWorkAfterDidMount = () => {
    this.logCallTrack({}, primaryCallName, 'doOtherWorkAfterDidMount');

    const tabListAvailable = this.getTabListAvailable();

    if (tabListAvailable.length > 0) {
      const { name } = getCurrentRoute();

      this.setTabActiveKey(name);
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
      'getTabListAvailable',
    );

    const { name } = getCurrentRoute();
    const { pathname } = getCurrentLocation();

    for (const item of this.tabList || []) {
      if (item.key === key) {
        let path = pathname
          .replace('/update', '/load')
          .replace(`/${name}`, '/');

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
            list: this.establishTabBarExtraContentLeftConfig(),
          })}
        />
      ),
      right: (
        <TabBarExtraBox
          list={this.buildByExtraBuildType({
            keyPrefix: 'data_tab_container_tab_bar_right_action_key',
            list: this.establishTabBarExtraContentRightConfig(),
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

export { InternalTabFlow };
