import { BaseNeedlessLoadModal } from '../BaseNeedlessLoadModal';

/**
 * base display modal
 * @namespace framework.DataModal
 * @class BaseDisplayModal
 * @extends BaseNeedlessLoadModal
 */
class BaseDisplayModal extends BaseNeedlessLoadModal {
  showFooter = false;

  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }
}

export { BaseDisplayModal };
