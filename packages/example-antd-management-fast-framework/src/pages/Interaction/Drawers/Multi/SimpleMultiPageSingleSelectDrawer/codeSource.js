export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleMultiPageSelectDrawer from '../BaseSimpleMultiPageSelectDrawer';

const visibleFlag = '73c6c95f5e6042269ffea572f74f736b';

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
  }
}

export default SimpleMultiPageSingleSelectDrawer;
`;
