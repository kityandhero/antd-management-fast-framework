import { BaseNeedlessLoadModal } from '../BaseNeedlessLoadModal';

class BaseDisplayModal extends BaseNeedlessLoadModal {
  showFooter = false;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }
}

export { BaseDisplayModal };
