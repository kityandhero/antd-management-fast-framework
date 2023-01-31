import { getDerivedStateFromPropsForUrlParams } from 'antd-management-fast-common';

import { Common } from '../Common';

class Wrapper extends Common {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export { Wrapper };
