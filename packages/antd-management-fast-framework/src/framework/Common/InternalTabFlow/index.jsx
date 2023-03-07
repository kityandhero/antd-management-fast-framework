import { checkStringIsNullOrWhiteSpace, logDevelop } from 'easy-soft-utility';

import { getCurrentParameters } from 'antd-management-fast-common';

import { InternalFlow } from '../InternalFlow';

class InternalTabFlow extends InternalFlow {
  tabList = [];

  currentInitialTabKey = '';

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  establishTabBarExtraContentLeftConfig = () => {
    return null;
  };

  establishTabBarExtraContentRightConfig = () => {
    return null;
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getInitialTabActiveKey = () => {
    if (checkStringIsNullOrWhiteSpace(this.currentInitialTabKey)) {
      const routeParameters = getCurrentParameters();

      this.currentInitialTabKey =
        this.analysisInitialTabActiveKey(routeParameters);
    }

    return this.currentInitialTabKey;
  };

  analysisInitialTabActiveKey = (o) => {
    logDevelop(
      { urlParams: o },
      'analysisInitialTabActiveKey need overload to analysis tab current initial active key',
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
    this.currentInitialTabKey = key;
  };
}

export { InternalTabFlow };
