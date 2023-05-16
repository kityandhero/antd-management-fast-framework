import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleMultiPageSelectDrawer from '../BaseSimpleMultiPageSelectDrawer';

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
  }
}

export default SimpleMultiPageDrawer;
