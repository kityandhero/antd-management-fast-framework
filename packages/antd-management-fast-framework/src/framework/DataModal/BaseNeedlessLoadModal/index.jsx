import { formatDatetime } from '../../../utils/tools';
import { formNameCollection, datetimeFormat } from '../../../utils/constants';

import Base from '../Base';

class BaseAddModal extends Base {
  reloadWhenShow = false;

  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        visible: false,
        needReset: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible } = nextProps;
    const { visible: visiblePre, externalData } = prevState;

    let needReset = false;

    if (visiblePre === false && visible === true) {
      needReset = true;
    }

    return { visible, needReset, externalData };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProps, preState, snapshot) => {
    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    form.resetFields();
  };

  buildInitialValues = () => {
    return this.fillDefaultInitialValues();
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[formNameCollection.createTime.name] = formatDatetime(
      new Date(),
      datetimeFormat.yearMonthDayHourMinute,
    );

    return initialValues;
  };
}

export default BaseAddModal;
