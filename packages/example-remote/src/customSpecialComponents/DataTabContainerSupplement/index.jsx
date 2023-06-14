import { logTrace, mergeArrowText } from 'easy-soft-utility';

import { tabBarCollection } from 'antd-management-fast-common';
import { DataTabContainer } from 'antd-management-fast-framework';

const primaryCallName = 'DataTabContainerSupplement';

class DataTabContainerSupplement extends DataTabContainer {
  static getDerivedStateFromProps(nextProperties, previousState) {
    logTrace(
      { parameter: { nextProperties, previousState } },
      mergeArrowText(primaryCallName, 'getDerivedStateFromProps'),
    );

    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  establishTabBarExtraContentLeftConfig = () => {
    return {
      buildType: tabBarCollection.extraBuildType.iconInfo,
      text: '功能导航:',
    };
  };
}

export { DataTabContainerSupplement };
