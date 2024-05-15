import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseSimpleMultiPageSelectDrawer } from '../BaseSimpleMultiPageSelectDrawer';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '71ca206537f64f4fa00247381a6d6eb2';

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
