import { tabBarCollection } from 'antd-management-fast-common';
import { DataTabContainer } from 'antd-management-fast-framework';

class DataTabContainerSupplement extends DataTabContainer {
  establishTabBarExtraContentLeftConfig = () => {
    return {
      buildType: tabBarCollection.extraBuildType.iconInfo,
      text: '功能导航:',
    };
  };
}

export { DataTabContainerSupplement };
