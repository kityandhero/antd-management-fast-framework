import { datetimeFormat, formNameCollection } from '../../../utils/constants';
import { formatDatetime } from '../../../utils/tools';
import Base from '../Base';

class BaseNeedlessLoadDrawer extends Base {
  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
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

    initialValues[formNameCollection.createTime.name] = formatDatetime({
      data: new Date(),
      format: datetimeFormat.yearMonthDayHourMinute,
    });

    return initialValues;
  };
}

export default BaseNeedlessLoadDrawer;
