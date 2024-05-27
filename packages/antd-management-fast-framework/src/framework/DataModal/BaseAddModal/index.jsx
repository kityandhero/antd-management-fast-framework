import { BaseNeedlessLoadModal } from '../BaseNeedlessLoadModal';

/**
 * base add modal
 * @namespace framework.DataModal
 * @class BaseAddModal
 * @augments BaseNeedlessLoadModal
 */
class BaseAddModal extends BaseNeedlessLoadModal {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  /**
   * get derived state from props
   * @static
   * @param {Object} nextProperties
   * @param {Object} previousState
   * @returns {Object}
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }
}

export { BaseAddModal };
