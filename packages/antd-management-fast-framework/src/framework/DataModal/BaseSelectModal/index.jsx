import { isFunction } from 'antd-management-fast-common';

import { BaseLoadModal } from '../BaseLoadModal';

class BaseSelectModal extends BaseLoadModal {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        currentRecord: null,
      },
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
