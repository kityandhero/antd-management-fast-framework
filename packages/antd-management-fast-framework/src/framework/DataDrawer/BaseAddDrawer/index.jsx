import { formatDatetime } from '../../../utils/tools';
import { formNameCollection, datetimeFormat } from '../../../utils/constants';

import BaseNeedlessLoadDrawer from '../BaseNeedlessLoadDrawer';

class BaseAddDrawer extends BaseNeedlessLoadDrawer {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }
}

export default BaseAddDrawer;
