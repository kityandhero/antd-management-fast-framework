import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleMultiPageSelectDrawer from '../BaseSimpleMultiPageSelectDrawer';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '5d72df79921e438fa86762e52929fce1';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleMultiPageSingleSelectDrawer extends BaseSimpleMultiPageSelectDrawer {
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

export { SimpleMultiPageSingleSelectDrawer };