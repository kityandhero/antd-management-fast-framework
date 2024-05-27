import { BaseNeedlessLoadModal } from '../BaseNeedlessLoadModal';

/**
 * base display modal
 * @namespace framework.DataModal
 * @class BaseDisplayModal
 * @augments BaseNeedlessLoadModal
 */
class BaseDisplayModal extends BaseNeedlessLoadModal {
  showFooter = false;

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

export { BaseDisplayModal };
