import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  endsWith,
  isArray,
  isEmptyArray,
} from 'easy-soft-utility';

import { getCurrentLocation } from 'antd-management-fast-common';
import { BaseComponent, PageExtra } from 'antd-management-fast-component';

import { switchControlAssist } from '../../utils/switchControlAssist';
import { tabControlAssist } from '../../utils/tabControlAssist';
import { ShortcutNavigation } from '../ShortcutNavigation';

const { PageWrapper } = PageExtra;

@connect(({ switchControl, tabControl }) => ({
  switchControl,
  tabControl,
}))
class PageExtraWrapper extends BaseComponent {
  getProperties = () => {
    return {
      useShortcutNavigation: false,
      tabFlag: '',
      tabList: [],
      ...this.props,
    };
  };

  doWorkAfterDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.checkActiveKey();
    }, 300);
  };

  getUsableKey = () => {
    const { tabList } = this.getProperties();

    const { pathname } = getCurrentLocation();

    let result = '';

    for (const item of tabList) {
      const { key } = item;

      if (endsWith(pathname, key)) {
        result = key;

        break;
      }
    }

    return result;
  };

  checkActiveKey = () => {
    const { tabFlag, tabList } = this.getProperties();

    if (!isArray(tabList)) {
      return;
    }

    if (isEmptyArray(tabList)) {
      return;
    }

    const usableKey = this.getUsableKey();

    if (!checkStringIsNullOrWhiteSpace(usableKey)) {
      const activeKey = tabControlAssist.getActiveKey(tabFlag);

      if (checkStringIsNullOrWhiteSpace(activeKey)) {
        tabControlAssist.setActiveKey(tabFlag, usableKey);
      }

      return activeKey;
    }
  };

  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    const {
      children,
      useShortcutNavigation,
      switchControl,
      tabControl,
      flag,
      tabFlag,
      ...rest
    } = this.getProperties();

    const spinning = switchControlAssist.check(switchControl, flag);
    const activeKey = tabControl[tabFlag] || '';

    return (
      <PageWrapper
        {...rest}
        useShortcutNavigation={useShortcutNavigation || false}
        shortcutNavigation={<ShortcutNavigation />}
        dataLoading={spinning}
        reloading={spinning}
        tabActiveKey={activeKey}
      >
        {children}
      </PageWrapper>
    );
  }
}

export { PageExtraWrapper };
