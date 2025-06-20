import { datetimeFormat, formatDatetime } from 'easy-soft-utility';

import { formNameCollection } from 'antd-management-fast-common';

import { BaseFormDrawer } from '../BaseFormDrawer';

const primaryCallName = 'DataDrawer::BaseNeedlessLoadDrawer';

/**
 * base needless load drawer
 * @namespace framework.DataDrawer
 * @class BaseNeedlessLoadDrawer
 * @extends BaseFormDrawer
 */
class BaseNeedlessLoadDrawer extends BaseFormDrawer {
  reloadWhenShow = false;

  resetDataAfterLoad = false;

  showReloadButton = false;

  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
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
