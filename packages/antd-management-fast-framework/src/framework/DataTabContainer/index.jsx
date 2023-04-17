import { iconBuilder } from 'antd-management-fast-component';

import { DataLoad } from '../DataSingleView/DataLoad';

class DataTabContainer extends DataLoad {
  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      defaultAvatarIcon: iconBuilder.picture(),
      showPageHeaderAvatar: true,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    return null;
  };
}

export { DataTabContainer };
