import { connect } from 'easy-soft-dva';

import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

const { BaseSelectModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'bd5d02637eec418da885f933b0f40ec2';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSingleSelectModal extends BaseSelectModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '选择文章',
      loadApiPath: 'simple/singleList',
    };
  }
}

export { SimpleSingleSelectModal };
