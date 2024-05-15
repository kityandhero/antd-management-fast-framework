export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleSinglePageSelectModal from '../../BaseSimpleSinglePageSelectModal';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'b7f7c4c27d7a42d095e80f176029ba8f';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageFrontendPaginationConfirmSelectModal extends BaseSimpleSinglePageSelectModal {
  // 使用模拟分页, 默认 false, 不使用二次选择确认时可不用特殊指定
  useFrontendPagination = true;

  // 指定使用选择确认模式, 默认 false, 不使用二次选择确认时可不用特殊指定
  confirmSelect = true;

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

export { SimpleSinglePageFrontendPaginationConfirmSelectModal };
`;
