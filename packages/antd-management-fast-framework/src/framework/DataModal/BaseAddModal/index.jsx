import BaseNeedlessLoadModal from '../BaseNeedlessLoadModal';

class BaseAddModal extends BaseNeedlessLoadModal {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }
}

export default BaseAddModal;
