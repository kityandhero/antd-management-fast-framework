export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleSinglePageSelectDrawer from '../BaseSimpleSinglePageSelectDrawer';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '7ab5be8b387042f8b92c66fcfa02d331';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageConfirmSelectDrawer extends BaseSimpleSinglePageSelectDrawer {
  // 指定使用选择确认模式
  confirmSelect = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);
  }
}

export default SimpleSinglePageConfirmSelectDrawer;
`;
