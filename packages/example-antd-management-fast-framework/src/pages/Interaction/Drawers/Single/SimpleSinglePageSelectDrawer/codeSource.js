export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleSinglePageSelectDrawer from '../BaseSimpleSinglePageSelectDrawer';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'da3bbfa15180472992244f3b33d36229';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageSelectDrawer extends BaseSimpleSinglePageSelectDrawer {
  // 是否使用选择确认模式, 默认 false, 不使用二次选择确认时可不用特殊指定
  confirmSelect = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);
  }
}

export default SimpleSinglePageSelectDrawer;
`;
