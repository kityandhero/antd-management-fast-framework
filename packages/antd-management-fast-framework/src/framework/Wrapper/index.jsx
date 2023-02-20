import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { Common } from '../Common';

class Wrapper extends Common {
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }
}

export { Wrapper };
