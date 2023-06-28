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

const { PageWrapper } = PageExtra;

@connect(({ switchControl, tabControl }) => ({
  switchControl,
  tabControl,
}))
class PageExtraWrapper extends BaseComponent {
  doWorkAfterDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.checkActiveKey();
    }, 300);
  };

  getUsableKey = () => {
    const { tabList } = this.props;

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
    const { tabFlag, tabList } = this.props;

    if (!isArray(tabList)) {
      return;
    }

    if (isEmptyArray(tabList)) {
      return;
    }

    const usableKey = this.getUsableKey();

    if (!checkStringIsNullOrWhiteSpace(usableKey)) {
      tabControlAssist
        .getActiveKey(tabFlag)
        .then((activeKey) => {
          if (checkStringIsNullOrWhiteSpace(activeKey)) {
            tabControlAssist.setActiveKey(tabFlag, usableKey);
          }

          return activeKey;
        })
        .catch(() => {
          // ignore
        });
    }
  };

  renderFurther() {
    const { children, switchControl, tabControl, flag, tabFlag, ...rest } =
      this.props;

    const spinning = switchControlAssist.check(switchControl, flag);
    const activeKey = tabControl[tabFlag] || '';

    return (
      <PageWrapper
        {...rest}
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
