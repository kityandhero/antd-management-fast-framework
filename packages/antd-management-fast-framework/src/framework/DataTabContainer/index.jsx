import {
  checkStringIsNullOrWhiteSpace,
  logTrace,
  mergeArrowText,
} from 'easy-soft-utility';

import {
  getCurrentLocation,
  getCurrentLocationParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { DataLoad } from '../DataSingleView/DataLoad';

const primaryCallName = 'DataTabContainer';

/**
 * data tab container
 * @namespace framework
 * @class DataTabContainer
 * @augments DataLoad
 */
class DataTabContainer extends DataLoad {
  resetDataAfterLoad = false;

  urlParametersStash = {};

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      defaultAvatarIcon: iconBuilder.picture(),
      showPageHeaderAvatar: true,
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    logTrace(
      { parameter: { nextProperties, previousState } },
      mergeArrowText(primaryCallName, 'getDerivedStateFromProps'),
    );

    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {
    this.logCallTrack(
      {
        preProperties,
        preState,
        snapshot,
      },
      primaryCallName,
      'doWorkWhenDidUpdate',
    );

    const previousLocationParameters = this.urlParametersStash;
    const currentLocationParameters = getCurrentLocationParameters();

    this.urlParametersStash = currentLocationParameters;

    const { urlParams } = this.state;
    const { urlParams: urlParametersPrevious } = preState;

    if (
      (urlParams || null) == null ||
      (urlParametersPrevious || null) == null
    ) {
      return;
    }

    const { op } = { op: '', ...currentLocationParameters };
    const { op: previousOp } = { op: '', ...previousLocationParameters };

    if (
      (previousOp === 'load' && op === 'update') ||
      this.checkNeedUpdate(preProperties, preState, snapshot)
    ) {
      const { loadApiPath } = this.state;

      if (!checkStringIsNullOrWhiteSpace(loadApiPath)) {
        this.reloadData({});
      }

      const { pathname } = getCurrentLocation();

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
