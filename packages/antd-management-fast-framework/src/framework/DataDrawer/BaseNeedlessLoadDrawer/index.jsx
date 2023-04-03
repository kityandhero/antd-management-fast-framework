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

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProperties, preState, snapshot) => {
    const form = this.getTargetForm();

    if (!form) {
      return;
    }

    form.resetFields();
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

export { BaseNeedlessLoadDrawer };
