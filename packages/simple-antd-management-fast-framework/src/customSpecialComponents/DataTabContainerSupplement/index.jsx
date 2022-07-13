import DataTabContainer from 'antd-management-fast-framework/es/framework/DataTabContainer';
import { tabBarCollection } from 'antd-management-fast-framework/es/utils/constants';

class DataTabContainerSupplement extends DataTabContainer {
  establishTabBarExtraContentLeftConfig = () => {
    return {
      buildType: tabBarCollection.extraBuildType.iconInfo,
      text: '功能导航：',
    };
  };
}

export default DataTabContainerSupplement;
