import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { PageListDrawerCore } from '../PageListDrawerCore';

const visibleFlag = 'e5a73755969449d68b2c87d9fc592f13';

@connect(({ accessWay, schedulingControl }) => ({
  accessWay,
  schedulingControl,
}))
class PageListDrawer extends PageListDrawerCore {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '模块列表',
    };
  }
}

export default PageListDrawer;
