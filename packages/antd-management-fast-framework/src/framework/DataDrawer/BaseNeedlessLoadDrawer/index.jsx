import { datetimeFormat, formatDatetime } from 'easy-soft-utility';

import { formNameCollection } from 'antd-management-fast-common';

import { BaseFormDrawer } from '../BaseFormDrawer';

const primaryCallName = 'DataDrawer::BaseNeedlessLoadDrawer';

class BaseNeedlessLoadDrawer extends BaseFormDrawer {
  resetDataAfterLoad = false;

  showReloadButton = false;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToShow');

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
