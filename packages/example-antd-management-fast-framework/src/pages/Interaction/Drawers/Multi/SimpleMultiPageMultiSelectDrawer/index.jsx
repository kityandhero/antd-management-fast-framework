import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleMultiPageSelectDrawer from '../BaseSimpleMultiPageSelectDrawer';

const visibleFlag = 'f8bd4c26d10846959efff3d6f45e319d';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleMultiPageMultiSelectDrawer extends BaseSimpleMultiPageSelectDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);
  }
}

export default SimpleMultiPageMultiSelectDrawer;
