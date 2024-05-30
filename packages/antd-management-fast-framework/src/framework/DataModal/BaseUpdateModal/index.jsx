import { BaseLoadModal } from '../BaseLoadModal';

class BaseUpdateModal extends BaseLoadModal {
  /**
   * @constructs
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);
  }
}

export { BaseUpdateModal };
