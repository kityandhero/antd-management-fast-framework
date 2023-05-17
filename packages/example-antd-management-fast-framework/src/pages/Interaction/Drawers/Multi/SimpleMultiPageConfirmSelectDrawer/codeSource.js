export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleMultiPageSelectDrawer from '../BaseSimpleMultiPageSelectDrawer';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '7dba9c6a1d24418c86eeb2da67aa74f8';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleMultiPageDrawer extends BaseSimpleMultiPageSelectDrawer {
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

export default SimpleMultiPageDrawer;
`;
