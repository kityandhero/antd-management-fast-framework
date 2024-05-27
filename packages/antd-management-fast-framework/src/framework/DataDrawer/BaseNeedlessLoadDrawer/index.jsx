import { datetimeFormat, formatDatetime } from 'easy-soft-utility';

import { formNameCollection } from 'antd-management-fast-common';

import { BaseFormDrawer } from '../BaseFormDrawer';

const primaryCallName = 'DataDrawer::BaseNeedlessLoadDrawer';

/**
 * base needless load drawer
 * @namespace framework.DataDrawer
 * @class BaseNeedlessLoadDrawer
 * @augments BaseFormDrawer
 */
class BaseNeedlessLoadDrawer extends BaseFormDrawer {
  resetDataAfterLoad = false;

  showReloadButton = false;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  /**
   * get derived state from props
   * @static
   * @param {Object} nextProperties
   * @param {Object} previousState
   * @returns {Object}
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToShow');

    this.logCallTrace(
      {},
      primaryCallName,
      'doOtherWhenChangeVisibleToShow',
      'trigger',
      'resetTargetForm',
    );

    this.resetTargetForm();
  };

  buildInitialValues = () => {
    this.logCallTrack({}, primaryCallName, 'buildInitialValues');

    return this.fillDefaultInitialValues();
  };

  fillDefaultInitialValues = () => {
    this.logCallTrack({}, primaryCallName, 'fillDefaultInitialValues');

    const initialValues = {};

    initialValues[formNameCollection.createTime.name] = formatDatetime({
      data: new Date(),
      format: datetimeFormat.yearMonthDayHourMinute,
    });

    return initialValues;
  };
}

export { BaseNeedlessLoadDrawer };
