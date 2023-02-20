import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { Supplement } from '../Supplement';

class SupplementWrapper extends Supplement {
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }
}

export { SupplementWrapper };
