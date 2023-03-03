import { InternalFlow } from '../InternalFlow';

class InternalTabFlow extends InternalFlow {
  currentKey = '';

  tabList = [];

  establishTabBarExtraContentLeftConfig = () => {
    return null;
  };

  establishTabBarExtraContentRightConfig = () => {
    return null;
  };

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getTabActiveKey = () => {
    return this.currentKey;
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
    this.currentKey = key;
  };
}

export { InternalTabFlow };
