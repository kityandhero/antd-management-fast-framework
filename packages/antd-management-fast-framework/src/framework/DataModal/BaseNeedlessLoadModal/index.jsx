import { datetimeFormat, formatDatetime } from 'easy-soft-utility';

import { formNameCollection } from 'antd-management-fast-common';

import { Base } from '../Base';

class BaseNeedlessLoadModal extends Base {
  reloadWhenShow = false;

  resetDataAfterLoad = false;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  doOtherWhenChangeVisibleToShow = () => {
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

export { BaseNeedlessLoadModal };
