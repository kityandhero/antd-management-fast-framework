import { getDerivedStateFromPropsForUrlParams } from 'antd-management-fast-common';

import Supplement from '../Supplement';

class SupplementWrapper extends Supplement {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export { SupplementWrapper };
