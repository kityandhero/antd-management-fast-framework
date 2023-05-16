export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleSinglePageSelectDrawer from '../../BaseSimpleSinglePageSelectDrawer';

const visibleFlag = 'afc20144a2fd4fd398602da925d93da7';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageSingleSelectDrawer extends BaseSimpleSinglePageSelectDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);
  }
}

export default SimpleSinglePageSingleSelectDrawer;
`;
