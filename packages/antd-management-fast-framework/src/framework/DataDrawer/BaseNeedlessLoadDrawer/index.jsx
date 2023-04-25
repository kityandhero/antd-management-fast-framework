import { datetimeFormat, formatDatetime } from 'easy-soft-utility';

import { formNameCollection } from 'antd-management-fast-common';

import { Base } from '../Base';

class BaseNeedlessLoadDrawer extends Base {
  resetDataAfterLoad = false;

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
    this.logCallTrack(
      {},
      'DataDrawer::BaseNeedlessLoadDrawer',
      'doOtherWhenChangeVisibleToShow',
    );

    const form = this.getTargetForm();

    if (!form) {
      return;
    }

    form.resetFields();
  };

  buildInitialValues = () => {
    this.logCallTrack(
      {},
      'DataDrawer::BaseNeedlessLoadDrawer',
      'buildInitialValues',
    );

    return this.fillDefaultInitialValues();
  };

  fillDefaultInitialValues = () => {
    this.logCallTrack(
      {},
      'DataDrawer::BaseNeedlessLoadDrawer',
      'fillDefaultInitialValues',
    );

    const initialValues = {};

    initialValues[formNameCollection.createTime.name] = formatDatetime({
      data: new Date(),
      format: datetimeFormat.yearMonthDayHourMinute,
    });

    return initialValues;
  };
}

export { BaseNeedlessLoadDrawer };
