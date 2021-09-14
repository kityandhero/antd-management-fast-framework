import { formatDatetime } from '../../../utils/tools';
import { formNameCollection } from '../../../utils/constants';

import BaseSaveDrawer from '../BaseSaveDrawer';

class BaseAddDrawer extends BaseSaveDrawer {
  needSetFormValueAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  buildInitialValues = () => {
    return this.fillFormDefaultInitialValues();
  };

  fillFormDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[formNameCollection.createTime.name] = formatDatetime(
      new Date(),
      datetimeFormat.yearMonthDayHourMinute,
    );

    return initialValues;
  };
}

export default BaseAddDrawer;
