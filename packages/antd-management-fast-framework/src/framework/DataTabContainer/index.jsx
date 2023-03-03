import { iconBuilder } from 'antd-management-fast-component';

import { DataLoad } from '../DataSingleView/DataLoad';

class DataTabContainer extends DataLoad {
  contentTabMode = true;

  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      defaultAvatarIcon: iconBuilder.picture(),
      showPageHeaderAvatar: true,
      customTabActiveKey: false,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {
    const { urlParams } = this.state;

    const { urlParams: urlParametersPrevious } = preState;

    if (
      (urlParams || null) == null ||
      (urlParametersPrevious || null) == null
    ) {
      return;
    }

    const { op } = urlParams;

    const { op: previousOp } = urlParametersPrevious;

    const { dataLoading } = this.state;

    if (
      !dataLoading &&
      ((previousOp === 'load' && op === 'update') ||
        this.checkNeedUpdate(preProperties, preState, snapshot))
    ) {
      this.reloadData();

      const {
        location: { pathname },
      } = this.props;

      this.redirectToPath(`${pathname.replace('/update/', '/load/')}`);
    }
  };

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
