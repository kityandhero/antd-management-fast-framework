export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleSinglePageSelectModal from '../../BaseSimpleSinglePageSelectModal';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '74673187d0dd4e34946d9bdeec7f299a';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageFrontendPaginationSingleSelectModal extends BaseSimpleSinglePageSelectModal {
  // 使用模拟分页, 默认 false, 不使用二次选择确认时可不用特殊指定
  useFrontendPagination = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      sourceCode: code,
    };
  }
}

export { SimpleSinglePageFrontendPaginationSingleSelectModal };
`;
