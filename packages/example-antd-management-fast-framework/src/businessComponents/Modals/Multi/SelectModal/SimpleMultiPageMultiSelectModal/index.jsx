import { connect } from 'easy-soft-dva';

import { logTemplate } from 'antd-management-fast-common';
import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleMultiPageSelectModal from '../BaseSimpleMultiPageSelectModal';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '9f5b76fbfbc4423596cfafc7c482fb3f';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleMultiPageMultiSelectModal extends BaseSimpleMultiPageSelectModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      showSelect: true,
      sourceCode: code,
    };
  }

  onBatchActionClick = (list) => {
    logTemplate({
      list,
    });
  };
}

export { SimpleMultiPageMultiSelectModal };
