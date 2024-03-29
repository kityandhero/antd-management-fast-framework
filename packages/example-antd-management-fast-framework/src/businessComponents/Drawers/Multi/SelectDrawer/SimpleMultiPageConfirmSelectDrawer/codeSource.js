export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseSimpleMultiPageSelectDrawer } from '../BaseSimpleMultiPageSelectDrawer';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '4aafaf9a78824182a4f507dc4e983e34';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleMultiPageConfirmSelectDrawer extends BaseSimpleMultiPageSelectDrawer {
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

export { SimpleMultiPageConfirmSelectDrawer };
`;
