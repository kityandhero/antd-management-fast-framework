import { tabBarCollection } from 'antd-management-fast-common/es/utils/constants';
import DataTabContainer from 'antd-management-fast-framework/es/framework/DataTabContainer';

class DataTabContainerSupplement extends DataTabContainer {
  establishTabBarExtraContentLeftConfig = () => {
    return {
      buildType: tabBarCollection.extraBuildType.iconInfo,
      text: '功能导航：',
    };
  };
}

export default DataTabContainerSupplement;
