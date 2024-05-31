import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { Supplement } from '../Supplement';

/**
 * 该类作为特有项目的补充，视具体项目进行增部方法
 * @namespace CustomWrapper
 * @class SupplementWrapper
 * @extends Supplement
 */
class SupplementWrapper extends Supplement {
  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }
}

export { SupplementWrapper };
