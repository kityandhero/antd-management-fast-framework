import { BaseNeedlessLoadModal } from '../BaseNeedlessLoadModal';

class BaseAddModal extends BaseNeedlessLoadModal {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }
}

export { BaseAddModal };
