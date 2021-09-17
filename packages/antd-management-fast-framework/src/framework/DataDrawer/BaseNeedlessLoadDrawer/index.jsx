import { formatDatetime } from '../../../utils/tools';
import { formNameCollection, datetimeFormat } from '../../../utils/constants';

import Base from '../Base';

class BaseNeedlessLoadDrawer extends Base {
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

export default BaseNeedlessLoadDrawer;