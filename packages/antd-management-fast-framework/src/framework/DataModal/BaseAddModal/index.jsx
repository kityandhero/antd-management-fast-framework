import { BaseNeedlessLoadModal } from '../BaseNeedlessLoadModal';

class BaseAddModal extends BaseNeedlessLoadModal {
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

export { BaseAddModal };
