import { datetimeFormat, formatDatetime } from 'easy-soft-utility';

import { formNameCollection } from 'antd-management-fast-common';

import { BaseFormModal } from '../BaseFormModal';

const primaryCallName = 'DataModal::BaseNeedlessLoadModal';

class BaseNeedlessLoadModal extends BaseFormModal {
  reloadWhenShow = false;

  resetDataAfterLoad = false;

  showReloadButton = false;

  /**
   * @constructs
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
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
    return this.fillDefaultInitialValues();
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[formNameCollection.createTime.name] = formatDatetime({
      data: new Date(),
      format: datetimeFormat.yearMonthDayHourMinute,
    });

    return initialValues;
  };
}

export { BaseNeedlessLoadModal };
