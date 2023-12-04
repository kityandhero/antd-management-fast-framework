export const code = `import { connect } from 'easy-soft-dva';

import { logTemplate } from 'antd-management-fast-common';
import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleSinglePageSelectModal from '../../BaseSimpleSinglePageSelectModal';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'a5d9f23ea16f435cb13bc514e5286186';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageFrontendPaginationMultiSelectModal extends BaseSimpleSinglePageSelectModal {
  // 使用模拟分页, 默认 false, 不使用二次选择确认时可不用特殊指定
  useFrontendPagination = true;

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

export { SimpleSinglePageFrontendPaginationMultiSelectModal };
`;
