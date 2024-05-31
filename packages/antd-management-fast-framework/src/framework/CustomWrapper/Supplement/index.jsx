import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { SupplementCore } from '../SupplementCore';

/**
 * 该类作为特有项目的补充，视具体项目进行增部方法
 * @namespace CustomWrapper
 * @class Supplement
 * @extends SupplementCore
 */
class Supplement extends SupplementCore {
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }
}

export { Supplement };
