import { checkStringIsNullOrWhiteSpace, logDevelop } from 'easy-soft-utility';

import { getCurrentParameters } from 'antd-management-fast-common';

import { InternalFlow } from '../InternalFlow';

class InternalTabFlow extends InternalFlow {
  tabList = [];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      currentTabKey: '',
    };
  }

  establishTabBarExtraContentLeftConfig = () => {
    return null;
  };

  establishTabBarExtraContentRightConfig = () => {
    return null;
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getTabActiveKey = () => {
    const { currentTabKey } = this.state;

    if (checkStringIsNullOrWhiteSpace(currentTabKey)) {
      const currentKey = this.analysisTabKey(getCurrentParameters());

      if (!checkStringIsNullOrWhiteSpace(currentKey)) {
        this.setState({ currentTabKey: currentKey });
      }
    }
  };

  analysisTabKey = (o) => {
    logDevelop(
      { urlParams: o },
      'analysisTabKey need overload to analysis tab current key',
    );

    return '';
  };

  getTabListAvailable = () => {
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
    // this.currentKey = key;

    this.setState({ currentTabKey: key });
  };
}

export { InternalTabFlow };
