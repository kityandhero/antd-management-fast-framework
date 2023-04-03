import { isFunction } from 'easy-soft-utility';

import { BaseLoadModal } from '../BaseLoadModal';

class BaseSelectModal extends BaseLoadModal {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      currentRecord: null,
    };
  }

  handleOk = () => {
    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      const { currentRecord } = this.state;

      afterSelectSuccess(currentRecord);
    }
  };
}

export { BaseSelectModal };
